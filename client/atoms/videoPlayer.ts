import { atom } from 'recoil';

export interface VideoPlayerAtom {
  playing: boolean;
  sidebar: boolean;
  fullscreen: boolean;
  volumeLevel: number;
}

export const videoPlayerAtom = atom<VideoPlayerAtom>({
  key: 'videoPlayer',
  default: {
    playing: true,
    sidebar: false,
    fullscreen: false,
    volumeLevel: 0, // 0 ~ 1 double
  },
});
