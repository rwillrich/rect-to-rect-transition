import { ContainerBox, FitRule, Size, Transforms, Scale, Translation } from './types.ts'

export function computeTransforms(container: ContainerBox, fitRule: FitRule, naturalSize: Size): Transforms {
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

export const translateTransform = (translation: Translation) => `translate3d(${translation.x}px, ${translation.y}px, 0)`
export const scaleTransform = (scale: Scale) => `scale3d(${scale.widthFactor}, ${scale.heightFactor}, 1)`
export const transforms = (scale: Scale, translation: Translation) => [translateTransform(translation), scaleTransform(scale)].join(' ')
