import AnswerCard from '../components/AnswerCard';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BorderLayout from '../components/BorderLayout';
import { useEffect, useState } from 'react';
import BasicButton from '../components/BasicButton';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Toast from '../components/Toast';

const QuestionPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { isLoggedIn, userId, nickName } = useSelector(
    (state) => state.userInfoSlice
  );
  const params = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [createdAt, setCreatedAt] = useState([]);
  const [modifiedAt, setModifiedAt] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [nickname, setNickname] = useState('');
  const [questionId, setQuestionId] = useState('');

  const handleDeleteQuestion = async () => {
    try {
      if (window.confirm('정말 질문을 삭제하시겠습니까?/')) {
        const response = await axios.delete(`/questions/${params.id}`);
        navigate('/questions');
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const navigatePostAnswer = () => {
    if (isLoggedIn) {
      navigate('/answer/post', {
        state: {
          questionId: questionId,
          questionContent: content,
          questionCategory: category,
        },
      });
    } else {
      if (
        window.confirm(
          '답변을 작성하시려면 로그인이 필요합니다 로그인 하시겠습니까?'
        )
      ) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    axios
      .get(`/questions/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setContent(res.data.content);
        setQuestionId(res.data.questionId);
        // setCategory(res.data.questionCategory);
        const newDate = res.data.createdAt
          .split('.')[0]
          .replace(/-/g, '.')
          .replace(/T/, '/');
        setCreatedAt(newDate);
        // setModifiedAt(res.data.modifiedAt);
        setMemberId(res.data.memberId);
        setNickname(res.data.nickname);
        const origin = res.data.answers;
        const sortedByLikesAnswer = origin.sort((a, b) =>
          a.likeCount > b.likeCount ? -1 : 1
        );
        setAnswer(sortedByLikesAnswer);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigateEditQuestion = () => {
    navigate('/edit/question', {
      state: {
        questionId: questionId,
        question: content,
        // category :questionCategory,
      },
    });
  };
  return (
    <>
      <BorderLayout>
      <Toast />
        <Title themeState={themeState}>{content}</Title>
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
          {userId == memberId ? (
            <>
              <EditDelete onClick={() => navigateEditQuestion()}>
                수정
              </EditDelete>
              <EditDelete onClick={() => handleDeleteQuestion()}>
                삭제
              </EditDelete>
            </>
          ) : (
            <></>
          )}
        </ContentInfo>
        <CenterWrapper>
              <AnswerToTal themeState={themeState}>
                답변 {answer.length}개
              </AnswerToTal>
              <BasicButton
                width={'5%'}
                height={'5%'}
                color={'white'}
                backGroundColor={'var(--color-orange)'}
                fontSize={'1.3rem'}
                padding={'1rem'}
                onClick={navigatePostAnswer}
                text={'답변등록'}
              />
            </CenterWrapper>
            {answer.map((el, i) => (
              <AnswerCard
                profileImg='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png'
                nickname={el.nickname}
                createdAt={el.createdAt
                  .split('.')[0]
                  .replace(/-/g, '.')
                  .replace(/T/, '/')}
                memberId={el.memberId}
                // modifiedAt='2022.09.20'
                content={el.content}
                likeCount={el.likeCount}
                comment={el.comments.sort((a, b) =>
                  a.likeCount > b.likeCount ? -1 : 1
                )}
                answerId={el.answerId}
                answer={answer}
                setAnswer={setAnswer}
              />
            ))}
      </BorderLayout>
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
const Date = styled.div`
  margin-right: 0.5%;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
`;

const CenterWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 0.5%;
  button {
    min-width: 7rem;
  }
  @media screen and (max-width: 413px) {
    button {
      width: 15%;
      padding: 0.5rem;
    }
  }
`;

const AnswerToTal = styled.div`
  font-weight: bold;
  margin-right: auto;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
`;


export default QuestionPage;
