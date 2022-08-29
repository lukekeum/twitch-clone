import styled from 'styled-components';

interface SearchBarProps {}

export function SearchBar({}: SearchBarProps) {
  return (
    <Container>
      <SearchInput />
      <SearchButton />
    </Container>
  );
}

const SearchButton = styled.button``;

const SearchInput = styled.input``;

const Container = styled.div``;
