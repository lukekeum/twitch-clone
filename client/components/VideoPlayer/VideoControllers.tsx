import styled from 'styled-components';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { cssVar } from '../../utils/css';
import { SideBarOff, SidebarOn } from './icons/SideBar';
import ControlButton from './ControlButton';
import { FullscreenOff, FullscreenOn } from './icons/Fullscreen';
import { useRecoilState } from 'recoil';
import { VideoPlayerAtom, videoPlayerAtom } from '../../atoms/videoPlayer';
import { PlayingOff, PlayingOn } from './icons/Playing';

interface VideoControllersProps {
  videoRef?: RefObject<HTMLVideoElement>;
}

export default function VideoControllers({ videoRef }: VideoControllersProps) {
  const [readonlyPlayerSetting, writeonlyPlayerSetting] =
    useRecoilState(videoPlayerAtom);

  const handlePlay = useCallback(() => {
    writeonlyPlayerSetting((prev) => ({
      ...prev,
      playing: !prev.playing,
    }));
  }, []);
  const handleSideBarClick = useCallback(() => {
    writeonlyPlayerSetting((prev) => ({
      ...prev,
      sidebar: !prev.sidebar,
    }));
  }, []);
  const handleFullscreenClick = useCallback(() => {
    writeonlyPlayerSetting((prev) => ({
      ...prev,
      fullscreen: !prev.fullscreen,
    }));
  }, []);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      if (
        videoRef.current.requestFullscreen &&
        readonlyPlayerSetting.fullscreen
      ) {
        videoRef.current.requestFullscreen();
      }
    }
  }, [readonlyPlayerSetting.fullscreen]);

  return (
    <VideoControllerContainer>
      <VideoUpperControl>
        <LiveTextContainer>
          <LiveText>LIVE</LiveText>
        </LiveTextContainer>
      </VideoUpperControl>
      <VideoDownControl>
        <ControlLeft>
          <ControlButton
            disabledIcon={<PlayingOff />}
            enabledIcon={<PlayingOn />}
            valid={readonlyPlayerSetting['playing']}
            handler={handlePlay}
          />
        </ControlLeft>
        <ControlRight>
          <ControlButton
            disabledIcon={<SideBarOff />}
            enabledIcon={<SidebarOn />}
            valid={readonlyPlayerSetting['sidebar']}
            handler={handleSideBarClick}
          />
          <ControlButton
            disabledIcon={<FullscreenOff />}
            enabledIcon={<FullscreenOn />}
            valid={readonlyPlayerSetting['fullscreen']}
            handler={handleFullscreenClick}
          />
        </ControlRight>
      </VideoDownControl>
    </VideoControllerContainer>
  );
}

const ControlLeft = styled.div`
  flex-grow: 1 !important;
`;

const ControlRight = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

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
  margin-right: 1rem;
  border-radius: ${cssVar('border-radius-medium')};
`;

const LiveText = styled.p`
  line-height: 1.5;
  font-weight: ${cssVar('font-weight-semibold')} !important;
  white-space: nowrap !important;
  text-transform: uppercase !important;
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
`;

const VideoControllerContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  &:hover {
    opacity: 1;
    transition-delay: 0ms;
    transition-duration: 250ms;
    transition-property: opacity;
  }
`;
