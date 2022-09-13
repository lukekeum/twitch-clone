import styled from '@emotion/react';
import { cssVar } from '../../utils/css';

interface ControlButtonProps {
  disabledIcon: React.ReactChild;
  enabledIcon: React.ReactChild;
  valid: boolean;
  handler?: () => void;
}

export default function ControlButton({
  disabledIcon,
  enabledIcon,
  valid,
  handler,
}: ControlButtonProps) {
  return (
    <ButtonContainer onClick={handler}>
      <Button>
        <div>
          <div></div>
          {valid ? enabledIcon : disabledIcon}
        </div>
      </Button>
    </ButtonContainer>
  );
}

const Button = styled.div`
  width: 2rem;
  height: 2rem;
`;

const ButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${cssVar('button-size-default')};
  width: ${cssVar('button-size-default')};
  border: ${cssVar('border-width-default')} solid transparent;
  background: ${cssVar('color-background-button-icon-overlay-default')};
  color: ${cssVar('color-text-button-overlay')};
  cursor: pointer;
  outline: none;
  &:hover {
    background: ${cssVar('color-background-button-icon-overlay-hover')};
    color: ${cssVar('color-text-button-overlay-hover')};
    border-radius: ${cssVar('border-radius-medium')};
  }
`;
