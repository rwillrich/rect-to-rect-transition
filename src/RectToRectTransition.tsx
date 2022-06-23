import { ContainerBox, FitRule, Size, Transforms, Scale, Translation, ContainerSize } from './types.ts'

function computeTransforms(container: ContainerBox, fitRule: FitRule, naturalSize: Size): Transforms {
  const outerWidthFactor = container.width / naturalSize.width
  const outerHeightFactor = container.height / naturalSize.height

  const scalingFactorSelector = fitRule === 'cover' ? Math.max : Math.min
  const contentScalingFactor = 1 / scalingFactorSelector(outerWidthFactor, outerHeightFactor)

  const outerScale: Scale = {
    widthFactor: outerWidthFactor,
    heightFactor: outerHeightFactor
  }
  const outerTranslation: Translation = { x: container.x, y: container.y }

  const innerWidthFactor = 1 / outerWidthFactor
  const innerHeightFactor = 1 / outerHeightFactor
  const innerScale: Scale = {
    widthFactor: innerWidthFactor / contentScalingFactor,
    heightFactor: innerHeightFactor / contentScalingFactor
  }

  const normalizedWidth = naturalSize.width / contentScalingFactor
  const normalizedHeight = naturalSize.height / contentScalingFactor

  const innerTranslation: Translation = {
    x: (container.width - normalizedWidth) * innerWidthFactor / 2,
    y: (container.height - normalizedHeight) * innerHeightFactor / 2
  }

  return {
    outerScale,
    outerTranslation,
    innerScale,
    innerTranslation,
    contentScalingFactor
  }
}

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
    contentScalingFactor
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
    transform: `translate3d(${outerTranslation.x}px, ${outerTranslation.y}px, 0) scale3d(${outerScale.widthFactor}, ${outerScale.heightFactor}, 1)`,
    overflow: 'hidden'
  }

  const innerStyles: React.CSSProperties = {
    ...commonStyles,
    transform: `translate3d(${innerTranslation.x}px, ${innerTranslation.y}px, 0) scale3d(${innerScale.widthFactor}, ${innerScale.heightFactor}, 1)`
  }

  return (
    <div style={outerStyles}>
      <div style={innerStyles}>
        {renderContent(contentScalingFactor)}
      </div>
    </div>
  )
}

export default RectToRectTransition
