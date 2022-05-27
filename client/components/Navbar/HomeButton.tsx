import Link from 'next/link';
import TwitchFigure from './icons/TwitchFigure';

export function HomeButton() {
  return (
    <Link href="/">
      <TwitchFigure />
    </Link>
  );
}
