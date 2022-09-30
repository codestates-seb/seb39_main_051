import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import DropDownList from '../components/DropDownList';
import NavigationBar from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const navigate = useNavigate();
  const { type, category } = useLocation().state;
  const [categoryContent, setCategoryContent] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [seleted, setSelected] = useState('');
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleCategory = (e) => {
    switch (e) {
      case '자바':
        setCategoryContent(1);
        break;
      case '리액트':
        setCategoryContent(2);
        break;
      case '스프링':
        setCategoryContent(3);
        break;
      case '자료구조':
        setCategoryContent(4);
        break;
      case '운영체제':
        setCategoryContent(5);
        break;
      case '데이터베이스':
        setCategoryContent(6);
        break;
      case '자료구조':
        setCategoryContent(7);
        break;
      case '자바스크립트':
        setCategoryContent(8);
        break;
        default:
          setCategoryContent(e);
          break
    }
  };

  const handleSubmitPost =  async(e) => {
    e.preventDefault();
    if (type === 'questions') {
      await axios.post(`/questions`, {
        memberId: 1,
        questionCategoryId: 1,
        content,
      })
      .then((res)=>console.log(res))
    } else if (type === 'free') {
      console.log('title : ' ,title,  'content : ', content, 'type :', '자유게시판','categoryContent :', categoryContent,'memberId :', 1 )
      await axios.post(`/posts`, {
        title,
        content,
        type: '자유게시판',
        category: categoryContent,
        memberId: 1,
      })
      .then((res)=>console.log(res))
    } else if (type === 'suggestion') {
      console.log('title : ' ,title,  'content : ', content, 'type :', '자유게시판','categoryContent :', categoryContent,'memberId :', 1 )
      await axios.post(`/posts`, {
        title,
        content,
        type: '건의게시판',
        category: categoryContent,
        memberId: 1,
      })
      .then((res)=>console.log(res))
    }
  };

  

  useEffect(() => {
    if ((type === 'questions') & !category) {
      setSelected('자바');
    } else if ((type === 'free') & !category) {
      setSelected('취업 정보');
    } else if ((type === 'suggestion') & !category) {
      setSelected('질문 추가 요청');
    } else {
      setSelected(category);
    }
  }, []);


  const handleCancel = () => {
    if (type === 'questions') {
      if (window.confirm('게시물 작성을 그만두시겠습니까?')) {
        navigate(`/questions`);
      }
    } else if (type === 'free') {
      if (window.confirm('게시물 작성을 그만두시겠습니까?')) {
        navigate(`/free`);
      }
    } else if (type === 'suggestion') {
      if (window.confirm('게시물 작성을 그만두시겠습니까?')) {
        navigate(`/suggestion`);
      }
    }
  };

  let boardName;
  if (type === 'questions') {
    boardName = '질문 답변 공유 게시판';
  } else if (type === 'free') {
    boardName = '자유 게시판';
  } else if (type === 'suggestion') {
    boardName = '건의 게시판';
  }

  return (
    <>
      <NavigationBar themeState={themeState} />
      <ContentWrapper>
        <FormWrapper themeState={themeState}>
          <form>
            <h1>{boardName}</h1>
            <InputWrapper themeState={themeState}>
              <input
                id='title'
                name='title'
                type='text'
                placeholder='제목'
                value={title}
                onChange={handleTitle}
                required
              />
            </InputWrapper>
            <DropDownList
              type={type}
              category={category}
              seleted={seleted}
              setSelected={setSelected}
              handleCategory={handleCategory}
            />
            <InputWrapper themeState={themeState}>
              <textarea
                id='body'
                name='body'
                type='text'
                placeholder='내용'
                value={content}
                onChange={handleContent}
                required
              />
            </InputWrapper>
            <ButtonWrapper>
              <BasicButton
                themeState={themeState}
                width='5.5rem'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='취소'
                onClick={handleCancel}
              />
              <BasicButton
                themeState={themeState}
                width='5.5rem'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='등록'
                onClick={handleSubmitPost}
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
      ? '1.5rem var(--color-orange) solid'
      : '1.5rem var(--color-gray) solid'};
  border-radius: 1rem;
  padding: 4rem 0;

  & form {
    display: flex;
    flex-direction: column;
    width: 95%;
    h1 {
      font-size: 300%;
      font-weight: bold;
      color: ${(props) =>
        props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
    }
    button {
      margin: 2rem 0 2rem 2rem;
    }
    select {
      max-width: 20rem;
      height: 4rem;
      font-size: 1.8rem;
      border: none;
      background-color: ${(props) =>
        props.themeState === 'light'
          ? 'var(--color-orange)'
          : 'var(--color-gray)'};
      color: ${(props) =>
        props.themeState === 'light'
          ? 'var(--color-white)'
          : 'var(--color-white)'};
      border-radius: 1rem;
      margin: 2rem 0;
      -webkit-appearance: none; /* 네이티브 외형 감추기 */
      -moz-appearance: none;
      appearance: none;
    }

    option {
      background-color: ${(props) =>
        props.themeState === 'light'
          ? 'var(--color-orange)'
          : 'var(--color-gray)'};
      color: ${(props) =>
        props.themeState === 'light'
          ? 'var(--color-white)'
          : 'var(--color-gray)'};
      -webkit-appearance: none; /* 네이티브 외형 감추기 */
      -moz-appearance: none;
      appearance: none;
    }
  }
`;

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
`;

export default PostPage;
