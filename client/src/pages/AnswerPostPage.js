import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import NavigationBar from '../components/NavigationBar';

const AnswerPostPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [answerContent, setAnswerContent] = useState('')
  const { state } =useLocation()

  const handleAnswer = (e) => {
    setAnswerContent(e.target.value)
  }
  const handleSubmitAnswerPost = async() => {
    try{
      const response = axios.post(`/answers`,{
        memberId : 1,
        questionId : state.questionId,
        content: answerContent
      })
      console.log(response)
      if(window.confirm('답변이 등록되었습니다.')){
        navigate(`/questions/${state.questionId}`)
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    setTitle(state.questionContent)
    setCategory(state.questionCategory)
  })
  return (
    <>
      <NavigationBar themeState={themeState} />
      <ContentWrapper>
        <FormWrapper themeState={themeState}>
          <form>
          <h1>답변 작성</h1>
            <InputWrapper themeState={themeState}>
              <Title themeState={themeState}><div>{title}</div></Title>
            </InputWrapper>
            <CategoryWrapper themeState={themeState}>
              <div>{category}</div>
            </CategoryWrapper>
            <InputWrapper themeState={themeState}>
              <textarea
                id='body'
                name='body'
                type='text'
                placeholder='답변 내용'
                value = {answerContent}
                onChange={handleAnswer}
                required
              />
            </InputWrapper>
            <ButtonWrapper>solid
              <BasicButton
                themeState={themeState}
                width='5.5rem'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='취소'
              />
              <BasicButton
                themeState={themeState}
                width='11rem'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='답변등록'
                onClick={handleSubmitAnswerPost}
              />
            </ButtonWrapper>
          </form>
        </FormWrapper>
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;

`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  min-height: 80rem;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-white)' : 'var(--color-gray)'};
  background-color: ${(props) =>
    props.themeState === 'light'
      ? 'var(--color-white)'
      : 'var(--color-dark-bg-color)'};
  border: ${(props) =>
    props.themeState === 'light'
      ? '1.5rem solid var(--color-orange) '
      : '1.5rem solid var(--color-gray) '};
  border-radius: 1rem;
  padding: 4rem 0;
  
  & form {
    display: flex;
    flex-direction: column;
    width: 95%;
    h1 {
      font-size: 300%;
      font-weight:bold;
      color: ${(props) =>props.themeState === 'light'? 'var(--color-black)' : '#D2D2D2'};
    }
    button {
      margin: 2rem 0 2rem 2rem;
    }
  }
`;
const CategoryWrapper = styled.div`
  font-size: 1.8rem;
  width: 20rem;
  height: 4rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) =>props.themeState === 'light' ? 'var(--color-white)' : '#D2D2D2'};
`;

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

const Title = styled.div`
    width: 100%;
    height: 4rem;
    font-size: 1.8rem;
    font-weight:bold;
    margin: 0.5rem 0;
    color: ${(props) =>props.themeState === 'light'? 'var(--color-black)' : '#D2D2D2'};
    background-color:${(props)=>props.themeState === 'light'? 'var(--color-white)' : 'var(--color-gray)'};
    border-radius: 0.3rem;
    border: 1px solid #d2d2d2;
    align-items:center;
    display:flex;
  div{
    align-items:center;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default AnswerPostPage;
