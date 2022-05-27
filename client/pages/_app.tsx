import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Navbar from '../components/Navbar';
import GlobalStyles from '../utils/GlobalStyles';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
