import { ContainerBox, FitRule, Size, ContainerSize } from './types.ts'
import { computeTransforms, transforms } from './transform-helpers.ts'

export type RectToRectTransitionProps = {
  activeContainer: ContainerSize,
  smallContainer: ContainerBox,
  largeContainer: ContainerBox,
  naturalSize: Size,
  smallFitRule: FitRule,
  largeFitRule: FitRule,
  duration: number,
  renderContent: (contentScalingFactor: number) => React.ReactNode
}

function RectToRectTransition({
  activeContainer = 'small',
  largeContainer,
  smallContainer,
  naturalSize,
  smallFitRule = 'contain',
  largeFitRule = 'contain',
  duration,
  renderContent
}: RectToRectTransitionProps) {
  const container = activeContainer === 'large' ? largeContainer : smallContainer
  const fitRule = activeContainer === 'large' ? largeFitRule : smallFitRule

  const {
    outerScale,
    outerTranslation,
    innerScale,
    innerTranslation,
    scalingFactorCompensation
  } = computeTransforms(container, fitRule, naturalSize)

  const commonStyles: React.CSSProperties = {
    transitionProperty: 'transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'linear',
    transformOrigin: 'left top',
    width: naturalSize.width,
    height: naturalSize.height,
  }

  const outerStyles: React.CSSProperties = {
    ...commonStyles,
    transform: transforms(outerScale, outerTranslation),
    overflow: 'hidden'
  }

  const innerStyles: React.CSSProperties = {
    ...commonStyles,
    transform: transforms(innerScale, innerTranslation)
  }

  return (
    <div style={outerStyles}>
      <div style={innerStyles}>
        {renderContent(scalingFactorCompensation)}
      </div>
    </div>
  )
}

export default RectToRectTransition
