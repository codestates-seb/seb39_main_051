import { useSelector } from 'react-redux';
import Comment from '../components/Comment';
import styled from 'styled-components';
import { useState } from 'react';
import BasicButton from './BasicButton';
const PostCard = ({ title, category, writer, createdAt, content, comments, likeCount }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const [isPostEditMode, setIsPostEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [eidtedContent, setEditedContent] = useState('');

  const handlePostEditMode = () => {
    setIsPostEditMode(!isPostEditMode);
    setEditedTitle(title);
    setEditedContent(content);
  };
  const handleEditTitle = (e) => {
    setEditedTitle(e.target.value);
  };
  const handleEditContent = (e) => {
    setEditedContent(e.target.value);
  };
  const handleDeletePost  = () => {

  };

  const handleSubmitEditPost = () => {
    console.log(editedTitle, eidtedContent);
    setIsPostEditMode(false);
  };


  return (
    <>
      {isPostEditMode ? (
        <FormWrapper themeState={themeState}>
          <form>
          <label id='editedTitle'>
            <textarea
              id='editedTitle'
              value={editedTitle}
              onChange={handleEditTitle}
            />
          </label>
          </form>
        </FormWrapper>
      ) : (
        <Title themeState={themeState}>{title}</Title>
      )}
      <ContentInfo>
        <Category themeState={themeState}>{category}</Category>
        <Writer themeState={themeState}>
          <img
            src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png'
            alt='프로필사진'
          />
          {writer}
        </Writer>
        <Date themeState={themeState}>{createdAt}</Date>
        {isPostEditMode ? (
          <>
            <EditDelete onClick={() => handleSubmitEditPost()}>등록</EditDelete>
            <EditDelete onClick={() => handlePostEditMode()}>취소</EditDelete>
          </>
        ) : (
          <>
            <EditDelete onClick={() => handlePostEditMode()}>수정</EditDelete>
            <EditDelete onClick={() => handleDeletePost()}>삭제</EditDelete>
          </>
        )}
      </ContentInfo>
      {isPostEditMode ? (
        <FormWrapper themeState={themeState}>
          <form id='contentForm'>
            <label id='editedContent' />
            <textarea
              id='editedContent'
              value={eidtedContent}
              onChange={handleEditContent}
            />
          </form>
        </FormWrapper>
      ) : (
        <Content>{content}
        </Content>
      )}
      <LikesWrapper>
        <div>❤️{likeCount}</div>
      </LikesWrapper>
      <CommentToTal themeState={themeState}>
        댓글 {comments.length}개
      </CommentToTal>
      <PostCommentInput themeState={themeState}>
      <label id='postComment' />
        <input id='postComment' placeholder='댓글을 입력하세요' />
        <BasicButton
          text='댓글등록'
          backGroundColor='#ff6c02'
          color='#ffffff'
        />
      </PostCommentInput>
      {comments.map((el) => (
        <Comment
          commentWriter={el.nickname}
          content={el.content}
          // profileImg={el.profileImg}
          modifiedAt={el.modifiedAt}
          likeCount={el.likeCount}
        />
      ))}
    </>
  );
};

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
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
const EditDelete = styled.div`
  color: #d2d2d2;
  margin-right: 0.5%;
  cursor: pointer;
`;
const Writer = styled.div`
  margin-right: 1rem;
  img {
    display: inline;
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
  }
`;
const Date = styled.div`
  margin-right: 0.5%;
`;
const Content = styled.div`
  margin: 1% 0;
  border: 1px solid #d4d4d4;
  min-height: 20rem;
`;
const LikesWrapper = styled.div`
  display: flex;
  justify-content: center;
  div {
    cursor: pointer;
  }
`;

const CommentToTal = styled.div`
  font-weight: bold;
  margin-bottom: 0.5%;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : 'var(--color-white)'};
`;

const FormWrapper = styled.div`
  display:flex;
  width:100%;
  form{
    width:100%;
  }
  textarea{
    width:100%;
    background: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
            color: ${(props)=>props.themeState ==='light' ? 'var(--color-black)': '#D4D4D4' };
  }
  #editedContent{
    min-height: 20rem;
  }
`
const PostCommentInput = styled.div`
  display: flex;
  margin: 1rem 0;
  input {
    width: 90%;
    margin-right: 0.5%;
    border: 1px solid #d4d4d4;
    background: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
    border-radius: 0.3rem;
  }
  button {
    width: 5%;
  }
  @media screen and (max-width: 412px) {
    display: flex;
    margin: 1rem 0;
    input {
      margin-right: 1rem;
      border: 1px solid #d4d4d4;
    }
    button {
      width:10%;
      font-size: 1rem;
      padding: 0.3rem;
    }
  }
`

export default PostCard;
