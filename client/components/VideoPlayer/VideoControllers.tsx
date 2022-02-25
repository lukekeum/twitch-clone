import { RefObject } from 'react';
import styled from 'styled-components';

interface VideoControllers {
  videoRef?: RefObject<HTMLVideoElement>;
}

export default function VideoControllers({}: VideoControllers) {
  return <VideoControllerContainer>asdf</VideoControllerContainer>;
}

const VideoControllerContainer = styled.div`
  display: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  &:hover {
    background: black;
  }
`;
