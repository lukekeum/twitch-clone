import { RefObject } from 'react';
import styled from 'styled-components';
import PlayButton from './icons/PlayButton';

interface VideoControllers {
  videoRef?: RefObject<HTMLVideoElement>;
}

export default function VideoControllers({}: VideoControllers) {
  return (
    <VideoControllerContainer>
      <div>
        <PlayButton />
      </div>
      <div></div>
    </VideoControllerContainer>
  );
}

const VideoControllerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
  opacity: 0;
  &:hover {
    display: flex;
    flex-wrap: wrap;
    background: black;
    transition: opacity 250ms;
    opacity: 0.5;
  }
`;
