import { RefObject } from 'react';
import styled from 'styled-components';
import { cssVar } from '../../utils/css';

interface VideoControllers {
  videoRef?: RefObject<HTMLVideoElement>;
}

export default function VideoControllers({ videoRef }: VideoControllers) {
  return (
    <VideoControllerContainer>
      <VideoUpperControl>
        <LiveTextContainer>
          <LiveText>LIVE</LiveText>
        </LiveTextContainer>
      </VideoUpperControl>
      <VideoDownControl></VideoDownControl>
    </VideoControllerContainer>
  );
}

const VideoUpperControl = styled.div`
  display: flex;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.35) 60%,
    transparent
  );
  flex-direction: row-reverse;
  pointer-events: none;
  margin-bottom: 5.5rem;
  padding: 2rem;
`;

const LiveTextContainer = styled.div`
  display: flex;
  font-size: ${cssVar('font-size-6')};
  background: ${cssVar('color-fill-live')};
  color: ${cssVar('color-text-overlay')};
  padding: 0 0.5rem;
  border-radius: ${cssVar('border-radius-medium')};
`;

const LiveText = styled.p`
  line-height: 1.5;
  font-weight: ${cssVar('font-weight-semibold')};
  white-space: nowrap;
  text-transform: uppercase;
`;

const VideoDownControl = styled.div`
  display: flex;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.35) 60%,
    transparent
  );
  padding: 2rem;
  margin-top: 5.5rem;
  pointer-events: none;
`;

const VideoControllerContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  &:hover {
    opacity: 1;
    transition-delay: 0ms;
    transition-duration: 250ms;
    transition-property: opacity;
    cursor: pointer;
  }
`;
