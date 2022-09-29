import React from 'react';
import Button, { ButtonStyleProps } from '../src/components/Button';
import { ColorEnum } from '../src/lib/getColorByType';
import { SizeEnum } from '../src/lib/getSizeWeight';

export default {
  title: 'Button',
  component: Button,
};

interface ButtonStoryProps extends ButtonStyleProps {
  value: string;
}

const ButtonStory = ({ value, ...args }: ButtonStoryProps) => {
  return <Button {...args}>{value}</Button>;
};

export const Default = ButtonStory.bind({});
Default.args = {
  type: [
    ColorEnum.Primary,
    ColorEnum.Secondary,
    ColorEnum.Info,
    ColorEnum.Warning,
    ColorEnum.Error,
  ],
  size: [
    SizeEnum.XS,
    SizeEnum.S,
    SizeEnum.MS,
    SizeEnum.M,
    SizeEnum.ML,
    SizeEnum.L,
    SizeEnum.XL,
  ],
  value: '',
};
