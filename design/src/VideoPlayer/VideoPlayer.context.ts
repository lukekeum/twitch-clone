import { createContext } from 'react';

interface VideoPlayerContextType {
  playing: boolean;
  fullscreen: boolean;
  sidebar: boolean;
  volume: number;
  setPlaying: Function;
  setFullscreen: Function;
  setSidebar: Function;
  setVolume: Function;
}

export const VideoPlayerContext = createContext<VideoPlayerContextType>({
  playing: false,
  fullscreen: false,
  sidebar: false,
  volume: 0,
  setPlaying: () => {},
  setFullscreen: () => {},
  setSidebar: () => {},
  setVolume: () => {},
});
