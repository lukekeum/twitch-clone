import { Fragment } from 'react';
import Navbar from '../components/Navbar';
import VideoPlayer from '../components/VideoPlayer';

export default function Index() {
  return (
    <Fragment>
      <Navbar />
      <VideoPlayer src="http://localhost:8000/live/lukekeum/index.m3u8" />
    </Fragment>
  );
}
