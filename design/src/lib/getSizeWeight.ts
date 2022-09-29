export type SizeType = 'xs' | 's' | 'ms' | 'm' | 'ml' | 'l' | 'xl';

export enum SizeEnum {
  XS = 'xs',
  S = 's',
  MS = 'ms',
  M = 'm',
  ML = 'ml',
  L = 'l',
  XL = 'xl',
}

export default function getSizeWeight(size: SizeType): number {
  switch (size) {
    case SizeEnum.XS:
      return 0.25;
    case SizeEnum.S:
      return 0.5;
    case SizeEnum.MS:
      return 0.75;
    case SizeEnum.M:
      return 1.0;
    case SizeEnum.ML:
      return 1.25;
    case SizeEnum.L:
      return 1.5;
    case SizeEnum.XL:
      return 1.75;
  }

  return 1.0;
}
