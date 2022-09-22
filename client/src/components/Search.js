import styled from 'styled-components';

const Search = (props) => {
  return (
    <>
      <SearchBar
        themeState={props.themeState}
        backGroundColor={props.backGroundColor}
      >
        <span>검색</span>
        <img src='https://upload.wikimedia.org/wikipedia/commons/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg' />
      </SearchBar>
    </>
  );
};

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25.6rem;
  height: 4rem;
  font-size: 1.8rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? props.backGroundColor : 'var(--color-gray)'};
  color: var(--color-white);
  border-radius: 1.5rem;
  padding: 0 1rem;

  & img {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

export default Search;
