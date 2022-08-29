import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userAtom } from '../../atoms/user';
import { cssVar } from '../../utils/css';
import AuthButtons from './AuthButtons';
import { HomeButton } from './HomeButton';
import { SearchBar } from './SearchBar';
import UserInfo from './UserInfo';

export default function Navbar() {
  const user = useRecoilValue(userAtom);

  return (
    <NavbarNav>
      <NavbarContainer>
        <Section flexGrow={1} flexShrink={2}>
          <Link href="/">
            <HomeButton />
          </Link>
        </Section>
        <Section flexGrow={2} flexShrink={1}>
          <SearchBar />
        </Section>
        <Section flexGrow={1} flexShrink={2}>
          {user.isLoggedIn ? <UserInfo /> : <AuthButtons />}
        </Section>
      </NavbarContainer>
    </NavbarNav>
  );
}

interface SectionProps {
  flexGrow: number;
  flexShrink: number;
}

const Section = styled.div<SectionProps>`
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: nowrap;
  &:hover {
    cursor: pointer;
  }
`;

const NavbarNav = styled.nav`
  z-index: 1000;
  flex-shring: 0;
  height: 5rem;
`;

const NavbarContainer = styled.div`
  display: flex;
  background-color: ${cssVar('color-background-base')};
  box-shadow: ${cssVar('shadow-elevation-1')};
  align-items: stretch;
  flex-wrap: nowrap;
  height: 100%;
`;
