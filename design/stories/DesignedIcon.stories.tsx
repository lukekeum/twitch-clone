// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from 'react';
import { Meta, Story } from '@storybook/react';
import DesignedIcon, { DesignedIconProps } from '../src/Icons';
import svg from '../src/Icons/svg';
import Player from '../src/Icons/svg/player/index';

const meta: Meta = {
  title: 'DesignedIcon',
  component: svg['player']['fullscreenOff'],
};

export default meta;

export const FullscreenOn = () => {
  return <DesignedIcon family="player" name="fullscreenOff" />;
};
