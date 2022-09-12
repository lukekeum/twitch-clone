import React from 'react';
import * as svg from './svg';

export type IconNameType = keyof typeof svg;
export interface IconProps {
  name: IconNameType;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icons({ name, className, style }: IconProps) {
  return React.createElement(svg[name], {
    className,
    style,
  });
}
