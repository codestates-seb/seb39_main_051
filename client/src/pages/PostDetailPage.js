import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BorderLayout from '../components/BorderLayout';
import { useSelector } from 'react-redux';
import Comment from '../components/Comment';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { toast } from 'react-toastify';


const PostDetailPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const {isLoggedIn,userId,nickName} = useSelector((state)=>state.userInfoSlice)
  const navigate = useNavigate();
  const params = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [modifiedAt, setModifiedAt] = useState([])
  const [comments, setComments] = useState([])
  const [memberId, setMemberId] = useState('')
  const [nickname, setNickname] = useState('')
  const [postId, setPostId] = useState('')
  const [likeCount, setLikeCount] = useState(0)
  const[type, setType] = useState('')
  const [postCommentContent, setPostCommentContent] = useState('');

  useEffect(()=>{
    axios.get(`/posts/${params.id}`)
    .then((res)=>{
      console.log(res.data)
      setTitle(res.data.title)
      setCategory(res.data.category)
      setMemberId(res.data.memberId)
      const newDate = res.data.createdAt.split('.')[0].replace(/-/g,'.').replace(/T/,'/')
      setCreatedAt(newDate)
      setContent(res.data.content)
      setComments(res.data.comments.sort((a,b)=>
      a.likeCount > b.likeCount ? -1 : 1) )
      setNickname(res.data.nickname)
      setPostId(res.data.postId)
      setLikeCount(res.data.likeCount)
      if(res.data.category === '취업 정보' || '고민 상담' || '유머' || '잡담'){
        setType('free')
      }
      else if(res.data.category === '질문 추가 요청' || '질문 수정 요청' || '기타'){
        setType('suggestion')
      }
    })
  },[])

    
  const handlePostComment = (e) => {
    setPostCommentContent(e.target.value)
  }
  const handleSubmitPostComment = async() => {
    if(isLoggedIn){
      await axios.post(`/posts/${params.id}/comments`,{
        memberId : 1,
        content : postCommentContent,
      })
      .then((res)=> {
        let arr = comments
        arr.push(res.data)
        console.log(arr)
        toast.success('댓글이 작성되었습니다.')
        setComments(arr)
        setPostCommentContent('')
      })
    }else{
      if(window.confirm('댓글을 작성하시려면 로그인이 필요합니다 로그인 하시겠습니까?')){
        navigate('/login')
      }
    }
  }
const handleDeletePost  = async() => {
    if(window.confirm('정말 삭제 하시겠습니까?')){
      await axios.delete(`/posts/${postId}`)
      if(category==='취업 정보' || '고민 상담' || '유머' || '잡답'){
        navigate('/free/')
      }else{
        navigate('/suggestion')
      }
    }
  };

  const handlePostLike = async() => {
    if(isLoggedIn){
      await axios.post(`/posts/${postId}/like`,{
        memberId:1
      })
      .then((res)=>setLikeCount(res.data.likeCount))
    }
    else{
      if(window.confirm('로그인이 필요합니다 로그인 하시겠습니까?')){
        navigate('/login')
      }
    }
  }

  //게시물 수정 페이지
  const navigateEditAnswer = () => {
    navigate('/edit/board', {
      state: {
        postId : postId,
        title: title,
        content: content,
        type: type,
        category :category,
      },
    });
  };

  return (
    <BorderLayout>
      <Toast />
      <Title themeState={themeState}>{title}</Title>
      <ContentInfo>
      <Category themeState={themeState}>{category}</Category>
        <Writer themeState={themeState}>
          <img
            src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png'
            alt='프로필사진'
          />
          {nickname}
        </Writer>
        <Date themeState={themeState}>{createdAt}</Date>
        {userId==memberId ? (
                      <>
                      <EditDelete onClick={() => navigateEditAnswer()}>수정</EditDelete>
                      <EditDelete onClick={() => handleDeletePost()}>삭제</EditDelete>
                    </>
        ) : (<></>)}
      </ContentInfo>
        <Content>{content}
        </Content>
              <LikesWrapper>
                <div onClick={()=>handlePostLike()}>❤️ {likeCount}</div>
              </LikesWrapper>
              <CommentToTal themeState={themeState}>
                댓글 {comments.length}개
              </CommentToTal>
              <PostCommentInput themeState={themeState}>
              <label id='postComment' />
                <input id='postComment' placeholder='댓글을 입력하세요' value={postCommentContent}  onChange={handlePostComment}/>
                <BasicButton
                  text='댓글등록'
                  backGroundColor='#ff6c02'
                  color='#ffffff'
                  onClick={handleSubmitPostComment}
                />
              </PostCommentInput>
              {comments.map((el) => (
                <Comment
                  key={el.commentId}
                  postId={postId}
                  commentId={el.commentId}
                  memberId = {el.memberId}
                  commentWriter={el.nickname}
                  content={el.content}
                  // profileImg={el.profileImg}
                  createdAt={el.createdAt.split('.')[0].replace(/-/g,'.').replace(/T/,'/')}
                  likeCount={el.likeCount}
                  commentArr={comments}
                  setCommentArr={setComments}
                />
              ))}
    </BorderLayout>
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


export default PostDetailPage;
