import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import TapMenu from '../components/TapMenu';
import Search from '../components/Search';
import BasicButton from '../components/BasicButton';
import { useState } from 'react';
import Pagination from '../components/Pagination';
import PostSummary from '../components/PostSummary';

const SuggestionBoardPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [data, setData] = useState([]);

  return (
    <>
      <NavigationBar />
      <ContentWrapper>
        <MenuWrapper>
          <TapMenu themeState={themeState} />
          <Search themeState={themeState} />
        </MenuWrapper>
        <ButtonWrapper>
          <BasicButton
            themeState={themeState}
            width='10rem'
            height='4rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.3rem'
            text='글 작성하기'
          />
        </ButtonWrapper>
        <PostSummaryWrapper>
          <PostSummary themeState={themeState} />
        </PostSummaryWrapper>
        <Pagination
          themeState={themeState}
          page={page}
          size={size}
          total={total}
          setPage={setPage}
          setSize={setSize}
          setTotal={setTotal}
        />
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
  justify-content: center;
  align-items: center;
  padding-top: 8rem;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;

  @media screen and (max-width: 412px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 80%;
  margin-top: 2rem;
`;

const PostSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem;
`;

export default SuggestionBoardPage;
