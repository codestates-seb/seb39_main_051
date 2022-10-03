import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import DropDownList from '../components/DropDownList';
import { useNavigate } from 'react-router-dom';
import BorderLayout from '../components/BorderLayout';
import axiosInstance from '../utils/axiosInstance';

const PostPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { userId } = useSelector((state) => state.userInfoSlice);
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
    console.log(e.target.innerText);
    switch (e.target.innerText) {
      case 'Java':
        setSelected(e.target.innerText);
        setCategoryContent(1);
        break;
      case 'React':
        setSelected(e.target.innerText);
        setCategoryContent(2);
        break;
      case 'Spring':
        setSelected(e.target.innerText);
        setCategoryContent(3);
        break;
      case 'Data Structure':
        setSelected(e.target.innerText);
        setCategoryContent(4);
        break;
      case 'Operating System':
        setSelected(e.target.innerText);
        setCategoryContent(5);
        break;
      case 'Database':
        setSelected(e.target.innerText);
        setCategoryContent(6);
        break;
      case 'Network':
        setSelected(e.target.innerText);
        setCategoryContent(7);
        break;
      case 'Javascript':
        setSelected(e.target.innerText);
        setCategoryContent(8);
        break;
      default:
        setSelected(e.target.innerText);
        setCategoryContent(e.target.innerText);
        break;
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (type === 'questions') {
      await axiosInstance.post(`/questions`, {
        questionCategoryId: categoryContent,
        content,
      });
      navigate('/questions');
    } else if (type === 'free') {
      await axiosInstance.post(`/posts`, {
        title,
        content,
        type: '자유게시판',
        category: categoryContent,
      })
      navigate('/free');
    } else if (type === 'suggestion') {
      await axiosInstance.post(`/posts`, {
        title,
        content,
        type: '건의게시판',
        category: categoryContent,
      });
      navigate('/suggestion');
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
    <BorderLayout>
      <form>
        <h1>{boardName}</h1>
        {type === 'questions' ? (
          <InputWrapper></InputWrapper>
        ) : (
          <InputWrapper themeState={themeState}>
            <label id='title' />
            <input
              id='title'
              name='title'
              type='text'
              placeholder='제목'
              value={title}
              onChange={handleTitle}
              required
            />
            <InputWrapper themeState={themeState}>
              <label id='content'/>
              {type === 'questions' ? (
                              <textarea
                              id='content'
                              name='content'
                              type='text'
                              placeholder='제목'
                              value={content}
                              onChange={handleContent}
                              required
                            />
              ) : (
                <textarea
                id='content'
                name='content'
                type='text'
                placeholder='내용'
                value={content}
                onChange={handleContent}
                required
              />
              )}
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
  button {
    margin: 2rem 0 2rem 2rem;
  }
`;

export default PostPage;
