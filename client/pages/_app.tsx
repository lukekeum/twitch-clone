import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '../utils/globalStyles';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
