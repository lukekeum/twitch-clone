import { Fragment } from 'react';
import VideoPlayer from '../components/VideoPlayer';

export default function Index() {
  return (
    <Fragment>
      <VideoPlayer
        width={675}
        height={380}
        src="http://localhost:8000/live/abcd/index.m3u8"
      />
    </Fragment>
  );
}
