import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import TapMenu from '../components/TapMenu';
import Search from '../components/Search';
import BasicButton from '../components/BasicButton';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import PostSummary from '../components/PostSummary';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionBoardPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { role } = useSelector((state) => state.userInfoSlice);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const navigate = useNavigate();
  const { category } = useParams();

  const categoryArr = [
    'Java',
    'Javascript',
    'Spring',
    'React',
    'Data Structure',
    'Operating System',
    'Database',
    'Network',
  ];

  useEffect(() => {
    if ((value !== '') & (categoryArr.indexOf(category) !== -1)) {
      axios
        .get(
          `/questions/search?questionCategory=${category}&keyword=${value}&page=${page}&size=10`
        )
        .then((res) => {
          setData(res.data.data);
        });
    } else if (value !== '') {
      axios
        .get(`/questions/search?keyword=${value}&page=${page}&size=10`)
        .then((res) => {
          setData(res.data.data);
        });
    } else if (categoryArr.indexOf(category) !== -1) {
      axios
        .get(
          `/questions?questionCategory=${category}&page=${page}&size=${size}`
        )
        .then((res) => setData(res.data.data));
    } else {
      axios.get(`/questions?page=${page}&size=${size}`).then((res) => {
        setData(res.data.data);
      });
      navigate('/questions');
    }
  }, [category, page, value]);

  const handleOnClick = () => {
    navigate('/post', {
      state: { type: 'questions', category: category || '자바' },
    });
  };

  const navigateToQuestionPage = (id) => {
    navigate(`/question/${id}`);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      setValue(e.target.value);
      if (categoryArr.indexOf(category) !== -1) {
        axios
          .get(
            `/questions/search?questionCategory=${category}&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => setData(res.data.data));
      } else {
        axios
          .get(`/questions/search?keyword=${value}&page=${page}&size=10`)
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
          <TapMenu themeState={themeState} type='answer' />
          <Search themeState={themeState} handleEnter={handleEnter} />
        </MenuWrapper>
        <ButtonWrapper>
          {role === 'ROLE_ADMIN' ? (
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
          ) : (
            <></>
          )}
        </ButtonWrapper>
        <PostSummaryWrapper>
          {data.map((el) => (
            <PostSummary
              themeState={themeState}
              key={el.questionId}
              title={el.content}
              category={el.questionCategory.name}
              writer={el.member.nickname}
              createdAt={el.createdAt}
              onClick={() => navigateToQuestionPage(el.questionId)}
            />
          ))}
        </PostSummaryWrapper>
        <Pagination
          themeState={themeState}
          page={page}
          size={size}
          total={total}
          setPage={setPage}
          setSize={setSize}
          setTotal={setTotal}
          value={value}
          type='질문 답변 공유 게시판'
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

export default QuestionBoardPage;
