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
  innerTranslation: Translation
}

function computeTransforms(container: ContainerBox, fitRule: FitRule, naturalSize: Size): Transforms {
  if (fitRule === 'contain') {
    const outerScale: Scale = {
      widthFactor: container.width / naturalSize.width,
      heightFactor: container.height / naturalSize.height
    }
    const outerTranslation: Translation = {
      x: (container.width - naturalSize.width) / 2,
      y: (container.height - naturalSize.height) / 2
    }
    const innerScale: Scale = { widthFactor: 1, heightFactor: 1 }
    const innerTranslation: Translation = { x: 0, y: 0 }

    return {
      outerScale,
      outerTranslation,
      innerScale,
      innerTranslation
    }
  }

  return {
    outerScale: { widthFactor: 1, heightFactor: 1 },
    outerTranslation: { x: 1, y: 1 },
    innerScale: { widthFactor: 1, heightFactor: 1 },
    innerTranslation: { x: 0, y: 0 }
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
  renderContent: ({ scale }: { scale: Scale }) => React.ReactNode
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
    innerTranslation
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
    transform: `scale(${outerScale.widthFactor}, ${outerScale.heightFactor}) translate(${outerTranslation.x}px, ${outerTranslation.y})px`
  }

  const innerStyles: React.CSSProperties = {
    ...commonStyles,
    transform: `scale(${innerScale.widthFactor}, ${innerScale.heightFactor}) translate(${innerTranslation.x}px, ${innerTranslation.y})px`
  }

  return (
    <div style={outerStyles}>
      <div style={innerStyles}>
        {renderContent({ scale: { widthFactor: 1, heightFactor: 1 } })}
      </div>
    </div>
  )
}

export default RectToRectTransition
