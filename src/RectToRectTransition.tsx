export type Translation = {
  x: number,
  y: number
}

export type Scale = {
  widthFactor: number,
  heightFactor: number
}

export type Size = {
  width: number,
  height: number
}

export type ContainerBox = {
  x: number,
  y: number,
  width: number,
  height: number
}

export type ContainerSize = 'small' | 'large'

export type FitRule = 'contain' | 'cover'

export type Transforms = {
  outerScale: Scale,
  outerTranslation: Translation,
  innerScale: Scale,
  innerTranslation: Translation,
  contentScalingFactor: number
}

function computeTransforms(container: ContainerBox, fitRule: FitRule, naturalSize: Size): Transforms {
  if (fitRule === 'contain') {
    const outerWidthFactor = container.width / naturalSize.width
    const outerHeightFactor = container.height / naturalSize.height

    const contentScalingFactor = 1 / Math.min(outerWidthFactor, outerHeightFactor)

    const innerWidthFactor = 1 / outerWidthFactor
    const innerHeightFactor = 1 / outerHeightFactor
    const outerScale: Scale = {
      widthFactor: outerWidthFactor,
      heightFactor: outerHeightFactor
    }
    const outerTranslation: Translation = { x: container.x, y: container.y }

    const innerScale: Scale = {
      widthFactor: innerWidthFactor / contentScalingFactor,
      heightFactor: innerHeightFactor / contentScalingFactor
    }

    const innerTranslation: Translation = {
      x: (container.width - naturalSize.width / contentScalingFactor) * innerWidthFactor / 2,
      y: (container.height - naturalSize.height / contentScalingFactor) * innerHeightFactor / 2
    }

    return {
      outerScale,
      outerTranslation,
      innerScale,
      innerTranslation,
      contentScalingFactor
    }
  }

  return {
    outerScale: { widthFactor: 1, heightFactor: 1 },
    outerTranslation: { x: 1, y: 1 },
    innerScale: { widthFactor: 1, heightFactor: 1 },
    innerTranslation: { x: 0, y: 0 },
    contentScalingFactor: 1
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
  smallFitRule,
  largeFitRule,
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
    transform: `translate3d(${outerTranslation.x}px, ${outerTranslation.y}px, 0) scale3d(${outerScale.widthFactor}, ${outerScale.heightFactor}, 1)`
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
