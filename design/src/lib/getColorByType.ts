import { palette } from '..';
import pallette from './palette';

export type ColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

export enum ColorEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export function getColor(type: ColorType) {
  switch (type) {
    case ColorEnum.Primary:
      return [palette.deepPurple['500'], palette.white];
    case ColorEnum.Secondary:
      return [palette.blue['500'], pallette.white];
    case ColorEnum.Success:
      return [palette.teal['500'], pallette.white];
    case ColorEnum.Info:
      return [palette.orange['500'], palette.white];
    case ColorEnum.Error:
      return [palette.red['500'], palette.white];
  }

  return '';
}
