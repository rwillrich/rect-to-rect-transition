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
