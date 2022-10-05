import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import TapMenu from '../components/TapMenu';
import Search from '../components/Search';
import BasicButton from '../components/BasicButton';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import PostSummary from '../components/PostSummary';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FreeBoardPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { isLoggedIn } = useSelector((state) => state.userInfoSlice);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const categoryArr = ['취업 정보', '고민 상담', '유머', '잡담'];

  const { category } = useParams();

  useEffect(() => {
    if ((value !== '') & (categoryArr.indexOf(category) !== -1)) {
      axios
        .get(
          `/posts/search?category=${category}&keyword=${value}&page=${page}&size=10`
        )
        .then((res) => {
          setData(res.data.data);
        });
    } else if (value !== '') {
      axios
        .get(
          `/posts/search?type=자유게시판&keyword=${value}&page=${page}&size=10`
        )
        .then((res) => {
          setData(res.data.data);
        });
    } else if (categoryArr.indexOf(category) !== -1) {
      axios
        .get(`/posts?category=${category}&page=${page}&size=10`)
        .then((res) => setData(res.data.data));
    } else {
      axios.get(`/posts?type=자유게시판&page=${page}&size=10`).then((res) => {
        setData(res.data.data);
      });
      navigate('/free');
    }
  }, [category, page, value]);

  const handleOnClick = () => {
    if (isLoggedIn) {
      navigate('/post', {
        state: { type: 'free', category: category || '취업 정보' },
      });
    } else {
      if (
        window.confirm(
          '게시글을 작성하시려면 로그인이 필요합니다 로그인하시겠습니까?'
        )
      ) {
        navigate('/login');
      } else {
        return;
      }
    }
  };

  const navigateToPostSumary = (id) => {
    navigate(`/board/${id}`);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      setValue(e.target.value);
      if (categoryArr.indexOf(category) !== -1) {
        axios
          .get(
            `/posts/search?category=${category}&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => setData(res.data.data));
      } else {
        axios
          .get(
            `/posts/search?type=자유게시판&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => {
            setData(res.data.data);
          });
      }
    }
  };

  return (
    <>
      <NavigationBar />
      <ContentWrapper>
        <MenuWrapper>
          <TapMenu themeState={themeState} type='free' />
          <Search themeState={themeState} handleEnter={handleEnter} />
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
            onClick={handleOnClick}
          />
        </ButtonWrapper>
        <PostSummaryWrapper>
          {data.map((el) => (
            <PostSummary
              themeState={themeState}
              key={el.postId}
              title={el.title}
              category={el.category}
              likes={el.likes}
              picture={el.member.picture}
              writer={el.member.nickname}
              createdAt={el.createdAt}
              onClick={() => navigateToPostSumary(el.postId)}
            />
          ))}
        </PostSummaryWrapper>
        <Pagination
          themeState={themeState}
          type='자유게시판'
          page={page}
          size={size}
          total={total}
          setPage={setPage}
          setSize={setSize}
          setTotal={setTotal}
          value={value}
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

export default FreeBoardPage;
