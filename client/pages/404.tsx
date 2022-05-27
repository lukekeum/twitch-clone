import Link from 'next/link';
import { Fragment } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { cssVar } from '../utils/css';

export default function PageNotFound() {
  return (
    <Fragment>
      <Navbar />
      <NotFoundContainer>
        <div>
          <NotFoundHeader>요청하신 페이지를 찾을 수 없습니다</NotFoundHeader>
          <Link prefetch href="/">
            <NotFoundButton>홈으로 돌아가기</NotFoundButton>
          </Link>
        </div>
      </NotFoundContainer>
    </Fragment>
  );
}

const NotFoundContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const NotFoundHeader = styled.h1``;

const NotFoundButton = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${cssVar('color-primary')};
  background-color: ${cssVar('color-background-button')};
  margin-top: 1rem;
  padding: 0.7rem 1.2rem;
  border-radius: ${cssVar('border-radius-medium')};
  cursor: pointer;
`;
