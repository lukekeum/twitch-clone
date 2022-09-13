import React, { HTMLAttributes } from 'react';
import * as svg from './svg';

type A = keyof typeof svg;
type IconName = `${A}/${keyof typeof svg[A]}`;

interface DesignedIconProps extends HTMLAttributes<HTMLOrSVGImageElement> {
  name: IconName;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function DesignedIcon({ name, ...props }: DesignedIconProps) {
  const [family, iName] = name.split('/') as [A, keyof typeof svg[A]];

  return React.createElement(svg[family][iName], {
    ...props,
  });
}
