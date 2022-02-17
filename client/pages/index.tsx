import { css } from '@emotion/react';

export default function Home() {
  return (
    <div>
      <h1 css={style}>Helloworld</h1>
    </div>
  );
}

const style = css`
  color: red;
`;
