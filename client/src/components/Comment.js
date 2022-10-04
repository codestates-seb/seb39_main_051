import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

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
  const [date, time] = createdAt.split('T')


  const handleEditComment = (e) => {
    setEditedComment(e.target.value)
  }
  const handleCommentEditMode = () => {
    setIsCommentEditMode(!isCommentEditMode)
    setEditedComment(commentContent)
  }
  const handleDeleteComment = async() => {
    if(window.confirm('댓글을 삭제하시겠습니까?')){
      await axiosInstance.delete(`/comments/${commentId}`)
      setCommentArr(commentArr.filter((el)=>el.commentId !== commentId))
    }
  }

  const handleSubmitEditComment = async() => {
    if(postId){
      await axiosInstance.patch(`/posts/${postId}/comments/${commentId}`,{
        memberId: 1,
        content : editedComment
      })
      toast.success(`댓글이 수정되었습니다!`)
      setCommentContent(editedComment)
      setEditedComment(editedComment)
    }
    else if(answerId) {
      await axiosInstance.patch(`/answers/${answerId}/comments/${commentId}`,{
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
    if(isLoggedIn){
      await axiosInstance.post(`/comments/${commentId}/like`,{
        memberId:1
      })
      .then((res)=>setCommentLikeContent(res.data.likeCount))
      .catch((err)=>console.log(err))
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
        <CommentEvent>
        <EventWrapper>
        <div>{date}</div><div className='time'>/{time}</div>
        {userId==memberId ? (
          isCommentEditMode ? (
              <EditDelete>
                <div className='edit leftOne' onClick={()=>handleSubmitEditComment()}>등록</div>
                <div className='edit' onClick={()=>handleCommentEditMode()}>취소</div>
              </EditDelete>
  ) : (
    <EditDelete>
      <div className='edit leftOne' onClick={()=>handleCommentEditMode()}>수정</div>
      <div className='edit' onClick={()=>handleDeleteComment()}>삭제</div>
    </EditDelete>
  )
        ) : (<></>)}
          </EventWrapper>
        </CommentEvent>
      </CommentInfo>
      <CommentContent themeState={themeState}>
        {isCommentEditMode ? (
                    <form>
                      <label id='editedComment' />
                      <textarea
                      id='editedComment'
                      value={editedComment}
                      onChange={handleEditComment}
                      />
                    </form>
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
  margin-top: 1%;
  padding-bottom:1%;
  border-bottom: 1px solid #d4d4d4;
  width: 100%;
`;
const CommentInfo = styled.div`
  display: flex;
  margin-bottom: 0.3rem;
`;


const CommentWriter = styled.div`
  font-weight: bold;
  width:85%;
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
    form{
      width:85%;
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
    width:85%;
  }
  .commentlikes {
    width:5%;
    font-weight: bold;
    min-width: 3rem;
    cursor: pointer;
  }
`;

const CommentEvent = styled.div`
  display: flex;
  font-size: 1.2rem;
`;

const EventWrapper =styled.div`
  display:flex;
  @media screen and (max-width: 412px) {
    display:block;
    .time{
      display:none;
    }
  }
`
const EditDelete = styled.div`
  display:flex;
  .edit {
    min-width: 2.3rem;
    color: #d4d4d4;
    cursor: pointer;
  }
  .leftOne{
    margin-right: 5%;
  }
  @media screen and (max-width: 412px) {
    .edit{
      margin-left:auto;
    }
  }
`


export default Comment;
