import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import VideoControllers from './VideoControllers';
import Hls from 'hls.js';

interface VideoProps {
  src: string;
  width?: number | 'auto';
  height?: number | 'auto';
}

export default function VideoPlayer({ src, width, height }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef && videoRef.current && Hls.isSupported()) {
      const video = videoRef.current;
      const hls = new Hls();
      hls.loadSource(video.src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  }, [videoRef]);

  return (
    <VideoContainer width={width} height={height}>
      <VideoControllers videoRef={videoRef} />
      <Video ref={videoRef} src={src} controls autoPlay />
    </VideoContainer>
  );
}

interface VideoContainerProps extends Pick<VideoProps, 'width' | 'height'> {}

const VideoContainer = styled.div<VideoContainerProps>`
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
`;

const Video = styled.video`
  background: black;
  width: 100%;
  height: 100%;
  z-index: 1;
  &::-webkit-media-controls-timeline,
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display {
    display: none;
  }
`;
