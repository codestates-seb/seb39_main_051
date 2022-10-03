import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import { useLocation, useNavigate } from 'react-router-dom';
import DropDownList from '../components/DropDownList';
import BorderLayout from '../components/BorderLayout';
import axiosInstance from '../utils/axiosInstance';

const EditBoardPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { state } = useLocation();
  const navigate = useNavigate();
  const [editedTitle, setEditedTitle] = useState(state.title);
  const [editedContent, setEditedContent] = useState(state.content);
  const [type, setType] = useState(state.type);
  const [select, setSelected] = useState(state.category);

  const handleBoardCategory = (e) => {
    setSelected(e.target.innerText);
  };

  const handleEditTitle = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditContent = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSubmitEditPost = async () => {
    console.log(editedContent, select);
    axiosInstance.patch(`/posts/${state.postId}`, {
      title: editedTitle,
      content: editedContent,
      category: select,
    })
    .then((res)=>console.log(res))
    alert('게시물이 수정되었습니다!')
    navigate(`/${type}`);
  };
  
  const handleEditPostCancel = () => {
    if (window.confirm('게시물 수정을 그만두시겠습니까?')) {
      navigate(`/board/${state.postId}`);
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
            <InputWrapper themeState={themeState}>
              <label id='editedTitle' />
              <input
                id='editedTitle'
                name='title'
                type='text'
                placeholder='제목'
                value={editedTitle}
                onChange={handleEditTitle}
                required
              />
            </InputWrapper>
            <DropDownList
              type={type}
              seleted={select}
              setSelected={setSelected}
              handleCategory={handleBoardCategory}
            />
            <InputWrapper themeState={themeState}>
              <label id='contentForm' />
              <textarea
                id='contentForm'
                name='contentForm'
                type='text'
                placeholder='내용'
                value={editedContent}
                onChange={handleEditContent}
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
                onClick={handleEditPostCancel}
              />
              <BasicButton
                themeState={themeState}
                width='5.5rem'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='수정'
                onClick={handleSubmitEditPost}
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

export default EditBoardPage;
