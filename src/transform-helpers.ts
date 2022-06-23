import { ContainerBox, FitRule, Size, Scale, Translation } from './types.ts'

export type Transforms = {
  outerScale: Scale,
  outerTranslation: Translation,
  innerScale: Scale,
  innerTranslation: Translation,
  scalingFactorCompensation: number
}

export function computeTransforms(container: ContainerBox, fitRule: FitRule, naturalSize: Size): Transforms {
  const outerWidthFactor = container.width / naturalSize.width
  const outerHeightFactor = container.height / naturalSize.height

  const scalingFactorSelector = fitRule === 'cover' ? Math.max : Math.min
  const contentScalingFactor = scalingFactorSelector(outerWidthFactor, outerHeightFactor)
  const scalingFactorCompensation = 1 / contentScalingFactor

  const outerScale: Scale = {
    widthFactor: outerWidthFactor,
    heightFactor: outerHeightFactor
  }
  const outerTranslation: Translation = { x: container.x, y: container.y }

  const innerWidthFactor = 1 / outerWidthFactor
  const innerHeightFactor = 1 / outerHeightFactor
  const innerScale: Scale = {
    widthFactor: innerWidthFactor / scalingFactorCompensation,
    heightFactor: innerHeightFactor / scalingFactorCompensation
  }

  const normalizedWidth = naturalSize.width / scalingFactorCompensation
  const normalizedHeight = naturalSize.height / scalingFactorCompensation

  const innerTranslation: Translation = {
    x: (container.width - normalizedWidth) * innerWidthFactor / 2,
    y: (container.height - normalizedHeight) * innerHeightFactor / 2
  }

  return {
    outerScale,
    outerTranslation,
    innerScale,
    innerTranslation,
    // This is needed for keeping something the same size in the content
    scalingFactorCompensation
  }
}

export const translateTransform = (translation: Translation) => `translate3d(${translation.x}px, ${translation.y}px, 0)`
export const scaleTransform = (scale: Scale) => `scale3d(${scale.widthFactor}, ${scale.heightFactor}, 1)`
export const transforms = (scale: Scale, translation: Translation) => [translateTransform(translation), scaleTransform(scale)].join(' ')
