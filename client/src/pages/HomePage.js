import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import TapMenu from '../components/TapMenu';

const HomePage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <NavigationBar themeState={themeState} />
      <ContentWrapper>
        <TapMenu
          themeState={themeState}
          backGroundColor='var(--color-orange)'
          color='var(--color-white)'
          fontSize='1.8rem'
          padding='0 2rem'
        />
        <Search themeState={themeState} backGroundColor='var(--color-orange)' />
        <Pagination themeState={themeState} />
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: none;
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
`;

export default HomePage;
