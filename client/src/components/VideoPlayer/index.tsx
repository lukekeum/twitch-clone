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
      const hls = new Hls({
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 10,
        liveDurationInfinity: true,
        liveBackBufferLength: 0,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  }, [videoRef]);

  return (
    <VideoContainer width={width} height={height}>
      <Video ref={videoRef} controls={false} autoPlay />
      <VideoControllers videoRef={videoRef} />
    </VideoContainer>
  );
}

const VideoContainer = styled.div<Pick<VideoProps, 'width' | 'height'>>`
  position: relative;
  font-size: 0;
  overflow: hidden;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
`;

const Video = styled.video`
  background: black;
  width: 100%;
  height: 100%;
  z-index: 1;
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-timeline,
  &::-webkit-media-controls-time-remaining-display,
  &::-webkit-media-controls-mute-button,
  &::-webkit-media-controls-toggle-closed-captions-button,
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  margin: 0;
  padding: 0;
`;
