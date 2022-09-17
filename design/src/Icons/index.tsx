import React, { HTMLAttributes } from 'react';
import svg from './svg';

type FamilyNames = keyof typeof svg;
type IconName<T extends FamilyNames> = keyof typeof svg[T];

export interface DesignedIconProps<T extends FamilyNames>
  extends HTMLAttributes<SVGElement> {
  family: T;
  name: IconName<T>;
}

export default function DesignedIcon<T extends FamilyNames>({
  family,
  name,
  ...props
}: DesignedIconProps<T>) {
  const Icon = (svg[family][name] as unknown) as Function;

  return <Icon {...props} />;
}
