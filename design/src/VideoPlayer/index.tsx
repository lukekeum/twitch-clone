import React, { useMemo, useState, useRef, useEffect } from 'react';
import { VideoPlayerContext } from './VideoPlayer.context';
import Hls from 'hls.js';

interface VideoPlayerProps {
  sidebar?: boolean;
  liveSticker?: boolean;
  src: string;
  width?: string;
  height?: string;
  autoPlay?: boolean;
  volumeLevel: number;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const [playing, setPlaying] = useState(props.autoPlay || false);
  const [fullscreen, setFullscreen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [volume, setVolume] = useState(() => props.volumeLevel);

  const playerRef = useRef<HTMLVideoElement>(null);

  const ctx = useMemo(
    () => ({
      playing,
      fullscreen,
      sidebar,
      volume,
      setPlaying,
      setFullscreen,
      setSidebar,
      setVolume,
    }),
    []
  );

  useEffect(() => {
    const player = playerRef.current;

    if (!player) return;

    if (player.canPlayType('application/vnd.apple.mpegurl')) {
      player.src = props.src;

      player.addEventListener('loadedmetadata', () => {
        player.play();
      });
    } else if (Hls.isSupported()) {
      const hls = new Hls({});

      hls.loadSource(props.src);
      hls.attachMedia(player);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        player.play();
      });
    } else {
      alert('실행을 위해 최신 브라우저를 이용해 주세요');
    }
  }, [playerRef]);

  useEffect(() => {
    if (!playerRef.current) return;

    if (playing) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.volume = volume;
  }, [volume]);

  return (
    <VideoPlayerContext.Provider value={ctx}>
      <video ref={playerRef} controls={false} autoPlay={props.autoPlay}></video>
    </VideoPlayerContext.Provider>
  );
}
