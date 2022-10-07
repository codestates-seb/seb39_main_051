import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import axiosInstance from '../utils/axiosInstance';
import BorderLayout from '../components/BorderLayout';

const AnswerPostPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { state } = useLocation();
  const { isLoggedIn, userId, nickName } = useSelector(
    (state) => state.userInfoSlice
  );
  const navigate = useNavigate();
  const [title, setTitle] = useState(state.questionContent);
  const [category, setCategory] = useState(state.questionCategory);
  const [answerContent, setAnswerContent] = useState('');
  const handleAnswer = (e) => {
    setAnswerContent(e.target.value);
  };
  const handleSubmitAnswerPost = async () => {
    try {
      const response = axiosInstance.post(`/answers`, {
        memberId: userId,
        questionId: state.questionId,
        content: answerContent,
      });
      if (window.confirm('답변을 등록하시겠습니까?')) {
        navigate(`/question/${state.questionId}`);
      }
    } catch (err) {}
  };
  const handleAnswerPostCancel = () => {
    if (window.confirm('답변 작성을 그만두시겠습니까?')) {
      navigate(`/question/${state.questionId}`);
    }
  };
  useEffect(() => {
    setTitle(state.questionContent);
    setCategory(state.questionCategory);
  }, []);
  return (
    <BorderLayout>
      <form>
        <h1>답변 작성</h1>
        <Title themeState={themeState}>{title}</Title>
        <ContentInfo>
          <Category themeState={themeState}>{category}</Category>
        </ContentInfo>
        <InputWrapper themeState={themeState}>
          <label id='content' />
          <textarea
            id='content'
            name='content'
            type='text'
            placeholder='내용'
            value={answerContent}
            onChange={handleAnswer}
            required
          />
        </InputWrapper>
      </form>
      <ButtonWrapper>
        <BasicButton
          themeState={themeState}
          width='5.5rem'
          height='4rem'
          color='var(--color-white)'
          backGroundColor='var(--color-orange)'
          fontSize='1.8rem'
          text='취소'
          onClick={handleAnswerPostCancel}
        />
        <BasicButton
          themeState={themeState}
          width='5.5rem'
          height='4rem'
          color='var(--color-white)'
          backGroundColor='var(--color-orange)'
          fontSize='1.8rem'
          text='등록'
          onClick={handleSubmitAnswerPost}
        />
      </ButtonWrapper>
    </BorderLayout>
  );
};

const InputWrapper = styled.div`
  margin: 1rem 0;
  & textarea {
    width: 100%;
    height: 25rem;
    font-size: 1.8rem;
    resize: none;
    margin: 0.5rem 0;
    color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-black)'
        : 'var(--color-white)'};
    background-color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
    border: 1px solid #d2d2d2;
    border-radius: 0.3rem;
  }
`;

const Category = styled.div`
  margin-right: auto;
  padding: 1rem;
  border-radius: 1.5rem;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-white)' : '#D2D2D2'};
  text-align: center;
  background-color: ${(props) =>
    props.themeState === 'light'
      ? ' var(--color-orange)'
      : 'var(--color-gray)'};
  min-width: 8.8rem;
`;

const Title = styled.div`
  width: 100%;
  height: 4rem;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-white)' : 'var(--color-gray)'};
  border-radius: 0.3rem;
  border: 1px solid #d2d2d2;
  align-items: center;
  display: flex;
  div {
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin: 2rem 0 2rem 2rem;
  }
`;
const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 2% 0;
`;

export default AnswerPostPage;
