import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import { useLocation, useNavigate } from 'react-router-dom';
import DropDownList from '../components/DropDownList';
import BorderLayout from '../components/BorderLayout';

const EditQuestionPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { state } = useLocation();
  const navigate = useNavigate();
  const [editedQuestion, setEditedQuestion] = useState(state.question)
  const handleEditQuestion = (e) => {
    setEditedQuestion(e.target.value);
  }
  const handleEditQuestionCancel = () => {
    if(window.confirm('질문 수정을 그만두시겠습니까?')){
      navigate(`/question/${state.questionId}`)
    }
    else{
      return
    }
    
  }
  const handleSubmitEditQuestion = async() => {
    await axios.patch(`/questions/${state.questionId}`,{
      content : editedQuestion})
      alert('질문이 수정되었습니다!')
      navigate('/questions')
  };
  return (
    <BorderLayout>
      <form>
        <h1>질문 수정</h1>
        <InputWrapper themeState={themeState}>
          <label id='editetQuestion' />
          <input
            id='editetQuestion'
            name='title'
            type='text'
            placeholder='질문'
            value={editedQuestion}
            onChange={handleEditQuestion}
            required
          />
        </InputWrapper>
        <ContentInfo>
                  <Category themeState={themeState}>{state.category}</Category>
                  </ContentInfo>
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
            onClick={handleEditQuestionCancel}
          />
          <BasicButton
            themeState={themeState}
            width='5.5rem'
            height='4rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.8rem'
            text='수정'
            onClick={handleSubmitEditQuestion}
          />
        </ButtonWrapper>
    </BorderLayout>
  );
};
const InputWrapper = styled.div`
  margin: 1rem 0;
  & input {
    width: 100%;
    height: 4rem;
    font-size: 1.8rem;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button{
    margin: 2rem 0 2rem 2rem;
  }
`;

const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 2% 0;
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

export default EditQuestionPage;
