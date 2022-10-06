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
import axiosInstance from '../utils/axiosInstance';

const PostDetailPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { isLoggedIn, userId } = useSelector((state) => state.userInfoSlice);
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [comments, setComments] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [nickname, setNickname] = useState('');
  const [postId, setPostId] = useState('');
  const [likeCount, setLikeCount] = useState('');
  const [type, setType] = useState('');
  const [postCommentContent, setPostCommentContent] = useState('');
  const[picture, setPicture] = useState('https://maeil-mail.s3.ap-northeast-2.amazonaws.com/1.png')

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+`/posts/${params.id}`).then((res) => {
      setTitle(res.data.title);
      setCategory(res.data.category);
      setMemberId(res.data.memberId);
      const newDate = res.data.createdAt
        .split('.')[0]
        .replace(/-/g, '.')
        .split('T');
      setDate(newDate[0]);
      setTime(newDate[1]);
      setContent(res.data.content);
      setComments(
        res.data.comments.sort((a, b) => (a.likeCount > b.likeCount ? -1 : 1))
      );
      setNickname(res.data.nickname);
      setPostId(res.data.postId);
      setLikeCount(res.data.likeCount);
      setPicture(res.data.picture)
      if (
        res.data.category === '취업 정보' ||
        '고민 상담' ||
        '유머' ||
        '잡담'
      ) {
        setType('free');
      } else if (
        res.data.category === '질문 추가 요청' ||
        '질문 수정 요청' ||
        '기타'
      ) {
        setType('suggestion');
      }
    });
  }, []);

  const handlePostComment = (e) => {
    setPostCommentContent(e.target.value);
  };
  const handleSubmitPostComment = async () => {
    if (isLoggedIn) {
      if(postCommentContent){
        await axiosInstance
        .post(`/posts/${params.id}/comments`, {
          content: postCommentContent,
        })
        .then((res) => {
          let arr = comments;
          arr.push(res.data);
          toast.success('댓글이 작성되었습니다.');
          setComments(arr);
          setPostCommentContent('');
        });
      }
      else{
        alert('댓글을 입력해주세요!')
        return
      }
    } else {
      if (
        window.confirm(
          '댓글을 작성하시려면 로그인이 필요합니다 로그인 하시겠습니까?'
        )
      ) {
        navigate('/login');
      }
    }
  };
  const handleDeletePost = async () => {
    if (window.confirm('정말 삭제 하시겠습니까?')) {
      await axiosInstance.delete(`/posts/${postId}`);
      if (category === '취업 정보' || '고민 상담' || '유머' || '잡답') {
        navigate('/free/');
      } else {
        navigate('/suggestion');
      }
    }
  };

  const handlePostLike = async () => {
    if (isLoggedIn) {
      await axiosInstance
        .post(`/posts/${postId}/like`, {
          memberId: userId,
        })
        .then((res) => setLikeCount(res.data.likeCount));
    } else {
      if (window.confirm('로그인이 필요합니다 로그인 하시겠습니까?')) {
        navigate('/login');
      }
    }
  };

  //게시물 수정 페이지
  const navigateEditPost = () => {
    navigate('/edit/board', {
      state: {
        postId: postId,
        title: title,
        content: content,
        type: type,
        category: category,
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
          <img src={picture} alt='프로필사진' />
          {nickname}
        </Writer>
        <EventWrapper>
          <div>{date}</div>
          <div className='time'>/{time}</div>
          {userId == memberId ? (
            <EditDelete>
              <div className='edit leftOne' onClick={() => navigateEditPost()}>
                수정
              </div>
              <div className='edit' onClick={() => handleDeletePost()}>
                삭제
              </div>
            </EditDelete>
          ) : (
            <></>
          )}
        </EventWrapper>
      </ContentInfo>
      <Content>{content}</Content>
      <LikesWrapper>
        <div onClick={() => handlePostLike()}>❤️ {likeCount}</div>
      </LikesWrapper>
      <CommentToTal themeState={themeState}>
        댓글 {comments.length}개
      </CommentToTal>
      <PostCommentInput themeState={themeState}>
        <label id='postComment' />
        <input
          id='postComment'
          placeholder='댓글을 입력하세요'
          value={postCommentContent}
          onChange={handlePostComment}
        />
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
          memberId={el.memberId}
          nickname={el.nickname}
          content={el.content}
          picture={el.picture}
          createdAt={el.createdAt
            .split('.')[0]
            .replace(/-/g, '.')
            .replace(/T/, '/')}
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
  @media screen and (max-width: 413px) {
    padding: 0.5rem;
  }
`;
const Writer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  min-width: 11.8rem;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
  img {
    display: inline;
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
  }
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
    width: 85%;
    margin-right: 0.5%;
    border: 1px solid #d4d4d4;
    background: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
    border-radius: 0.3rem;
    color: ${(props) =>
      props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
  }
  button {
    width: 5%;
  }
  @media screen and (max-width: 413px) {
    display: flex;
    margin: 1rem 0;
    input {
      margin-right: 1rem;
      border: 1px solid #d4d4d4;
    }
    button {
      width: 10%;
      font-size: 1rem;
      padding: 0.3rem;
    }
  }
`;

const EventWrapper = styled.div`
  display: flex;
  font-size: 1.2rem;
  @media screen and (max-width: 413px) {
    display: block;
    .time {
      display: none;
    }
  }
`;

const EditDelete = styled.div`
  display: flex;
  .edit {
    min-width: 2.3rem;
    color: #d4d4d4;
    cursor: pointer;
  }
  .leftOne {
    margin-right: 5%;
  }
  @media screen and (max-width: 413px) {
    .edit {
      margin-left: auto;
    }
  }
`;

export default PostDetailPage;
