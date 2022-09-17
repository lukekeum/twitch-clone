import player from './player';
import icon from './icon';
import React, { SVGProps } from 'react';

type FamilyNames = keyof typeof icons;
type IconName<T extends FamilyNames> = keyof typeof icons[T];

export type Props<T extends FamilyNames, N extends IconName<T>> = {
  [key in T]: {
    [family in N]: React.FunctionComponent<SVGProps<SVGElement>>;
  };
};

const icons = {
  player,
  icon,
};

export default icons;
