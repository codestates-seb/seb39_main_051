import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';

const Comment = ({commentId, nickname, content,memberId, createdAt, likeCount, profileImg, postId, answerId, commentArr, setCommentArr}) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const {isLoggedIn,userId,nickName} = useSelector((state)=>state.userInfoSlice)
  const navigate = useNavigate();
  //댓글수정
  const [isCommentEditMode, setIsCommentEditMode] = useState(false)
  const [editedComment, setEditedComment] = useState(content)
  const [commentContent, setCommentContent] = useState(content)
  // 좋아요
  const [commentLikeContent, setCommentLikeContent] = useState(likeCount)


  const handleEditComment = (e) => {
    setEditedComment(e.target.value)
  }
  const handleCommentEditMode = () => {
    setIsCommentEditMode(!isCommentEditMode)
    setEditedComment(commentContent)
  }
  const handleDeleteComment = async() => {
    if(window.confirm('댓글을 삭제하시겠습니까?')){
      await axios.delete(`/comments/${commentId}`)
      setCommentArr(commentArr.filter((el)=>el.commentId !== commentId))
    }
  }
  const handleSubmitEditComment = async() => {
    if(postId){
      await axios.patch(`/posts/${postId}/comments/${commentId}`,{
        memberId: 1,
        content : editedComment
      })
      toast.success(`댓글이 수정되었습니다!`)
      setCommentContent(editedComment)
      setEditedComment(editedComment)
    }
    else if(answerId) {
      await axios.patch(`/answers/${answerId}/comments/${commentId}`,{
        member1:1,
        content : editedComment
      })
      toast.success(`댓글이 수정되었습니다!`)
      setCommentContent(editedComment)
      setEditedComment(editedComment)
    }
    setIsCommentEditMode(false)
  }

  const handleCommentLike = async() => {
    console.log('@@@')
    if(isLoggedIn){
      await axios.post(`/comments/${commentId}/like`,{
        memberId:1
      })
      .then((res)=>setCommentLikeContent(res.data.likeCount))
    }else{
      if(window.confirm('로그인이 필요합니다 로그인 하시겠습니까?')){
        navigate('/login')
      }
    }
  }

  return (
    <Layout themeState={themeState}>
      <Toast />
      <CommentInfo>
        <CommentWriter>
          <img src={profileImg} alt='프로필사진' />
          {nickname}
        </CommentWriter>
        {userId==memberId ? (
          isCommentEditMode ? (
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
  )
        ) : (<></>)}
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
          <div className='commentContent'>{commentContent}</div>
          </>
        )}
        <div className='commentlikes' onClick={()=>handleCommentLike()}>❤️ {commentLikeContent}</div>
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
