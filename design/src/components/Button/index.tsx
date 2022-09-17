import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}

export default function Button({}: ButtonProps) {}
