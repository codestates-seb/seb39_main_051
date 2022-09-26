import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const Search = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <SearchBar themeState={themeState}>
        <SearchInput themeState={themeState} type='text' placeholder='검색' />
        <FontAwesomeIcon id='searchIcon' icon={faSearch} />
      </SearchBar>
    </>
  );
};

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 25.6rem;
  height: 4rem;
  font-size: 1.3rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  color: var(--color-white);
  border-radius: 1.5rem;
  margin: 1rem 0 1rem 1rem;

  #searchIcon {
    position: absolute;
    right: 5%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 4rem;
  font-size: 1.3rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  color: var(--color-white);
  border-radius: 1.5rem;
  border: none;
  padding-left: 1rem;

  ::placeholder {
    color: var(--color-white);
  }
`;

export default Search;
