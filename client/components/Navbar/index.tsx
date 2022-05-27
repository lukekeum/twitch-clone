import Link from 'next/link';
import styled from 'styled-components';
import { cssVar } from '../../utils/css';
import { HomeButton } from './HomeButton';
import TwitchFigure from './icons/TwitchFigure';

export default function Navbar() {
  return (
    <NavbarNav>
      <NavbarContainer>
        <Section flexGrow={1} flexShrink={2}>
          <Link href="/">
            <HomeButton />
          </Link>
        </Section>
        <Section flexGrow={2} flexShrink={1}></Section>
        <Section flexGrow={1} flexShrink={2}></Section>
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
