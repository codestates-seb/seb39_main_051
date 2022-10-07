import styled from 'styled-components';
import { useSelector } from 'react-redux';
import BasicButton from './BasicButton';
import Comment from './Comment';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AnswerCard = ({
  picture,
  nickname,
  memberId,
  createdAt,
  content,
  likeCount,
  comment,
  answerId,
  answer,
  setAnswer,
}) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useSelector((state) => state.userInfoSlice);
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [answerContent, setAnswerContent] = useState(content);
  const [isAnswerEditMode, setIsAnswerEditMode] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(content);
  const [commentContent, setCommentContent] = useState('');
  const [answerComment, setAnswerComment] = useState(comment);
  const [answerLikeContent, setAnswerLikeContent] = useState(likeCount);
  const [date, time] = createdAt.split('T');

  const toggleCommentShow = () => {
    setIsCommentShow(!isCommentShow);
  };

  const handleComment = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmitAnswerComment = () => {
    if (isLoggedIn) {
      if(commentContent){
        axiosInstance
        .post(`/answers/${answerId}/comments`, {
          content: commentContent,
        })
        .then((res) => {
          let arr = answerComment;
          arr.push(res.data);
          toast.success(`댓글이 작성되었습니다!`);
          setAnswerComment(arr);
          setCommentContent('');
        });
      }else{
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
      } else {
        return;
      }
    }
  };

  const handleEditAnswer = (e) => {
    setEditedAnswer(e.target.value);
  };

  const handleEditMode = () => {
    setIsAnswerEditMode(!isAnswerEditMode);
    setEditedAnswer(content);
  };

  const handleSubmitEditAnswer = () => {
    axiosInstance.patch(`/answers/${answerId}`, {
      content: editedAnswer,
    });
    toast.success('답변이 수정되었습니다!');
    setEditedAnswer(editedAnswer);
    setAnswerContent(editedAnswer);
    setIsAnswerEditMode(false);
  };

  const handleDeleteAnswer = () => {
    if (window.confirm('답변을 삭제하시겠습니까?')) {
      axiosInstance.delete(`/answers/${answerId}`);
      setAnswer(answer.filter((el) => el.answerId !== answerId));
      toast.success('답변이 삭제되었습니다.');
    }
  };

  const handleAnswerLike = () => {
    if (isLoggedIn) {
      axiosInstance
        .post(`/answers/${answerId}/like`)
        .then((res) => setAnswerLikeContent(res.data.likeCount));
    } else {
      if (window.confirm('로그인이 필요합니다 로그인 하시겠습니까?')) {
        navigate('/login');
      }
    }
  };

  return (
    <Layout themeState={themeState}>
      <Toast />
      <AnswerInfo>
        <AnswerWriter>
          <img src={picture} alt='유저 프로필' />
          {nickname}
        </AnswerWriter>
        <AnswerEvent>
          <EventWrapper>
            <div>{date}</div>
            <div className='time'>/{time}</div>
            {userId == memberId ? (
              isAnswerEditMode ? (
                <EditDelete>
                  <div
                    className='edit leftOne'
                    onClick={() => handleSubmitEditAnswer()}
                  >
                    등록
                  </div>
                  <div className='edit' onClick={() => handleEditMode()}>
                    취소
                  </div>
                </EditDelete>
              ) : (
                <EditDelete>
                  <div
                    className='edit leftOne'
                    onClick={() => handleEditMode()}
                  >
                    수정
                  </div>
                  <div className='edit' onClick={() => handleDeleteAnswer()}>
                    삭제
                  </div>
                </EditDelete>
              )
            ) : (
              <></>
            )}
          </EventWrapper>
        </AnswerEvent>
      </AnswerInfo>
      <AnswerLayout themeState={themeState}>
        <AnswerContent themeState={themeState}>
          {isAnswerEditMode ? (
            <div className='formWrapper'>
              <form>
                <label id='editedAnswer' />
                <textarea
                  id='editedAnswer'
                  value={editedAnswer}
                  onChange={handleEditAnswer}
                />
              </form>
            </div>
          ) : (
            <>
              <div className='answerContent'>{answerContent}</div>
            </>
          )}
          <div className='answerLikes' onClick={() => handleAnswerLike()}>
            ❤️{answerLikeContent}
          </div>
        </AnswerContent>
      </AnswerLayout>
      <AnswerCommentInput themeState={themeState}>
        <label id='comment' />
        <input
          placeholder='댓글을 입력하세요'
          value={commentContent}
          onChange={handleComment}
        />
        <BasicButton
          text='댓글등록'
          backGroundColor='#ff6c02'
          color='#ffffff'
          onClick={handleSubmitAnswerComment}
        />
      </AnswerCommentInput>
      {isCommentShow ? (
        <>
          <ToggleComment themeState onClick={() => toggleCommentShow()}>
            댓글 숨기기
          </ToggleComment>
          {answerComment.map((el) => (
            <Comment
              answerId={answerId}
              key={el.commentId}
              commentId={el.commentId}
              memberId={el.memberId}
              nickname={el.nickname}
              content={el.content}
              createdAt={el.createdAt.split('.')[0].replace(/-/g, '.')}
              likeCount={el.likeCount}
              picture={el.picture}
              commentArr={answerComment}
              setCommentArr={setAnswerComment}
            />
          ))}
        </>
      ) : (
        <>
          <ToggleComment
            themeState
            onClick={() => toggleCommentShow()}
          >{`총 ${answerComment.length} 개의 댓글이 있습니다.`}</ToggleComment>
        </>
      )}
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-size: 1.3rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? '#ffffff' : '#2d2d2d'};
  width: 100%;
  border: 1px solid #d4d4d4;
  margin-bottom: 1rem;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
`;
const AnswerInfo = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0.3rem;
`;
const AnswerWriter = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 85%;
  img {
    height: 2.4rem;
    width: 2.4rem;
    margin-right: 0.3rem;
    border-radius: 0.3rem;
  }
`;
const AnswerEvent = styled.div`
  display: flex;
  font-size: 1.2rem;
`;
const AnswerLayout = styled.div`
  display: flex;
  width: 100%;
`;
const AnswerContent = styled.div`
  display: flex;
  width: 100%;
  background: ${(props) =>
    props.themeState === 'light'
      ? 'var(--color-white)'
      : 'var(--color-dark-bg-color )'};
  .formWrapper {
    display: flex;
    width: 85%;
  }
  form {
    width: 100%;
  }
  textarea {
    width: 100%;
    border: 1px solid #d4d4d4;
    background: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
    color: ${(props) =>
      props.themeState === 'light' ? 'var(--color-black)' : '#D4D4D4'};
  }
  .answerContent {
    font-size: 2rem;
    width: 85%;
    margin-right: 0.5%;
    line-height:normal;
    white-space: pre-line;
  }
  .answerLikes {
    min-width: 5%;
    cursor: pointer;
  }
  @media screen and (max-width: 413px) {
    margin-right: 1rem;
  }
`;
const AnswerCommentInput = styled.div`
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

const ToggleComment = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  color: #d2d2d2;
`;

const EventWrapper = styled.div`
  display: flex;
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

export default AnswerCard;
