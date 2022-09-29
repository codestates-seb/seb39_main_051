import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Comment = ({commentId, nickname, content,memberId, createdAt, likeCount, profileImg}) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  //댓글수정
  const [isCommentEditMode, setIsCommentEditMode] = useState(false)
  const [editedComment, setEditedComment] = useState(content)
  const handleEditComment = (e) => {
    setEditedComment(e.target.value)
  }
  const handleCommentEditMode = () => {
    setIsCommentEditMode(!isCommentEditMode)
    setEditedComment(content)
  }
  const handleDeleteComment = () => {

  }
  const handleSubmitEditComment = () => {
    console.log(editedComment)
    setIsCommentEditMode(false)
  }



  return (
    <Layout themeState={themeState}>
      <CommentInfo>
        <CommentWriter>
          <img src={profileImg} alt='프로필사진' />
          {nickname}
        </CommentWriter>
        {isCommentEditMode ? (
                  <CommentEvent>
                  <div className='commentDate'>{createdAt}</div>
                  <div className='commentEdit' onClick={()=>handleSubmitEditComment()} >등록</div>
                  <div className='commentEdit' onClick={()=>handleCommentEditMode()}>취소</div>
                </CommentEvent>
        ) : (
          <CommentEvent>
          <div className='commentDate'>{createdAt}</div>
          <div className='commentEdit' onClick={()=>handleCommentEditMode()} >수정</div>
          <div className='commentEdit' onClick={()=>handleDeleteComment()}>삭제</div>
        </CommentEvent>
        )}
      </CommentInfo>
      <CommentContent themeState={themeState}>
        {isCommentEditMode ? (
                    <div className='formWrapper'>
                    <form>
                      <label id='editedComment' />
                      <textarea
                      id='editedComment'
                      value={editedComment}
                      onChange={handleEditComment}
                      />
                    </form>
                    </div>
        ) : (
          <>
          <div className='commentContent'>{content}</div>
          </>
        )}
        <div className='commentlikes'>❤️{likeCount}</div>
      </CommentContent>
    </Layout>
  );
};

const Layout = styled.div`
  margin: 1rem 0;
  border-bottom: 1px solid #d4d4d4;
  width: 100%;
`;
const CommentInfo = styled.div`
  display: flex;
  margin-bottom: 0.3rem;
`;
const CommentEvent = styled.div`
  display: flex;
  font-size: 1.2rem;
  .commentDate {
    margin-right: 0.5%;
  }
  .commentEdit {
    min-width: 2.1rem;
    color: #d4d4d4;
    margin-right:0.5rem;
    cursor: pointer;
  }
  @media screen and (max-width: 412px) {
    flex-direction:column;
    vertical-align: bottom;
    .commentDate {
      margin-right: 0rem;
    }
  }
`;

const CommentWriter = styled.div`
  font-weight: bold;
  width:90%;
  img {
    display: inline;
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
  }
`;
const CommentContent = styled.div`
  display: flex;
    .formWrapper{
      display:flex;
      width:90%;
    }
    form{
      width:100%;
    }
    textarea{
      font-size: 1.3rem;
      width:100%;
      border: 1px solid #d4d4d4;
      background: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
            color: ${(props)=>props.themeState ==='light' ? 'var(--color-black)': '#D4D4D4' };
    }
  .commentContent{
    width:90%;
    margin-right: 0.5%;
  }
  .commentlikes {
    width:5%;
    font-weight: bold;
    min-width: 3rem;
    cursor: pointer;
  }
`;

export default Comment;
