import AnswerCard from '../components/AnswerCard';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BorderLayout from '../components/BorderLayout';
import { useEffect, useState } from 'react';
import BasicButton from '../components/BasicButton';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const QuestionPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const params = useParams()
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [createdAt, setCreatedAt] = useState([]);
  const [modifiedAt, setModifiedAt] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [memberId, setMemberId] = useState('')
  const [nickname, setNickname] = useState('')
  const [questionId, setQuestionId] = useState('')
  //질문수정
  const [isQuestionEditMode, setIsQuestionEditMode] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');

  const handleEditQuestion = (e) => {
    setEditedQuestion(e.target.value);
  };
  const handleQuestionEditMode = () => {
    setIsQuestionEditMode(!isQuestionEditMode);
    setEditedQuestion(content);
  };

  const handleDeleteQuestion = async() => {
    try{
      const response = await axios.delete(`/questions/${params.id}`)
      navigate('/questions')
      console.log(response)
      return 
    }catch(error){
      console.log(error)
    }
  }

  const handleSubmitEditQuestion = async() => {
    try{
        const response = await axios.patch(`/questions/${params.id}`,{
        content : editedQuestion
      })
      setIsQuestionEditMode(false)
      console.log('hello')
      toast.success(`질문이 수정되었습니다!`)
      // setContent(response.data)
      //setEditedQuestion(response.data)
      return response
    }
    catch(error){
      console.log(error)
    }
    
  };


  const navigatePostAnswer = () => {
    navigate('/answer/post', {
      state: {
        questionId : questionId,
        questionContent: content,
        questionCategory: category,
      },
    });
  };

  useEffect(() => {
    axios.get(`/questions/${params.id}`)
    .then((res)=>{
    console.log(res)
    setContent(res.data.content);
    setEditedQuestion(res.data.content);
    setQuestionId(res.data.questionId)
    // setCategory(res.data.questionCategory);
    setCreatedAt(res.data.createdAt);
    // setModifiedAt(res.data.modifiedAt);
    setMemberId(res.data.memberId)
    setNickname(res.data.nickname)
    const origin = res.data.answers
    const sortedByLikesAnswer = origin.sort((a,b)=>
      a.likeCount > b.likeCount ? -1 : 1
    ) 
    setAnswer(res.data.answers)
    })
    .catch((err)=>console.log(err))

  }, []);
  return (
    <>
      <BorderLayout>
      <StyledContainer themeState={themeState} />
        {isQuestionEditMode ? (
          <FormWrapper themeState={themeState}>
            <form>
              <label id='editedQuestion'/>
              <textarea
                id='editedQuestion'
                value={editedQuestion}
                onChange={handleEditQuestion}
              />
            </form>
          </FormWrapper>
        ) : (
          <Title themeState={themeState}>{content}</Title>
        )}
        <ContentInfo>
          <Category themeState={themeState}>{category}</Category>
          <Writer themeState={themeState}>
            <img
              src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png'
              alt='프로필사진'
            />
            {nickname}
          </Writer >
          <Date themeState={themeState}>{createdAt}</Date>
          {isQuestionEditMode ? (
            <>
              <EditDelete onClick={() => handleSubmitEditQuestion()}>
                등록
              </EditDelete>
              <EditDelete onClick={() => handleQuestionEditMode()}>
                취소
              </EditDelete>
            </>
          ) : (
            <>
              <EditDelete onClick={() => handleQuestionEditMode()}>
                수정
              </EditDelete>
              <EditDelete onClick={() => handleDeleteQuestion()}>
                삭제
              </EditDelete>
            </>
          )}
        </ContentInfo>
        <CenterWrapper>
          <CommentToTal themeState={themeState}>
            답변 {answer.length}개
          </CommentToTal>
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
            writer={el.writer}
            modifiedAt='2022.09.20'
            content={el.content}
            likeCount={el.likeCount}
            comment={el.comments}
          />
        ))}
      </BorderLayout>
    </>
  );
};

const FormWrapper = styled.div`
  display: flex;
  width: 90%;
  form {
    width: 100%;
  }
  textarea {
    color: ${(props)=>props.themeState ==='light' ? 'var(--color-black)': '#D4D4D4' };
    font-size: 1.3rem;
    width: 100%;
    border: 1px solid #d4d4d4;
    background: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color : ${(props)=>props.themeState==='light' ? 'var(--color-black)' : '#D2D2D2'};
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
  color: ${(props)=>props.themeState==='light' ? 'var(--color-white)' : '#D2D2D2'};
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
  color: ${(props)=>props.themeState==='light' ? 'var(--color-black)' : '#D2D2D2'};
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
  color: ${(props)=>props.themeState==='light' ? 'var(--color-black)' : '#D2D2D2'};
`;

const CenterWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 0.5%;
  button{
    min-width: 7rem;
  }
  @media screen and (max-width: 413px) {
    button {
      width: 15%;
      padding: 0.5rem;
    }
  }
`;

const CommentToTal = styled.div`
  font-weight: bold;
  margin-right: auto;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
`; 

const TargetElement = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`

const StyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    background-color: ${(props)=>props.themeState==='light'? 'var(--color-orange)' : 'var(--color-gray)'};
    color:var(--color-white);
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
    background-color:  ${(props) => props.themeState==='light' ? 'var(--color-yellow)': 'var(--color-black)'};
  }
`;

export default QuestionPage;
