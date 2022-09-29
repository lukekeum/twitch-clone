import React from 'react';
import { css, SerializedStyles, jsx } from '@emotion/react';
import { ColorType, getColor } from '../../lib/getColorByType';
import getSizeWeight, { SizeType } from '../../lib/getSizeWeight';

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {
  css?: SerializedStyles;
}

export interface ButtonStyleProps {
  type: ColorType;
  bgColor?: string;
  color?: string;
  size: SizeType;
}

export default function Button(props: ButtonProps) {
  return <button css={[buttonStyle(props), props.css]}></button>;
}

const buttonStyle = (props: ButtonStyleProps) => css`
  background: ${props.bgColor || getColor(props.type)[0]};
  color: ${props.color || getColor(props.type)[1]};
  font-weight: bold;
  font-size: ${getSizeWeight(props.size) * 1}rem;
  border: none;
  border-radius: 4px;
  outline: none;
  padding: ${getSizeWeight(props.size) * 1.05}rem
    ${getSizeWeight(props.size) * 1.1}rem;
`;
