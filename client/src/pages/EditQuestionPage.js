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
  const [select, setSelected] = useState(state.category)
  console.log(state)
  const handleEditQuestion = (e) => {
    setEditedQuestion(e.target.value);
  }
  const handleQuestionCategory = (e) => {
    setSelected(e.target.innerText);
  };
  const handleEditQuestionCancel = () => {
    if(window.confirm('질문 수정을 그만두시겠습니까?')){
      navigate(`/question/${state.handleEditQuestionCancel}`)
    }
    else{
      return
    }
    
  }
  const handleSubmitEditQuestion = async() => {
    const response = await axios.patch(`/questions/${state.questionId}`,{
      content : editedQuestion})
      alert('질문이 수정되었습니다!')
      navigate('/questions')
  };
  return (
    <BorderLayout>
      <form>
        <h1>질문 답변 공유 게시판</h1>
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
        <DropDownList
          type='questions'
          seleted={select}
          setSelected={setSelected}
          handleCategory={handleQuestionCategory}
        />
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

export default EditQuestionPage;
