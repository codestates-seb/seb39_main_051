import AnswerCard from '../components/AnswerCard';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BorderLayout from '../components/BorderLayout';
import { useEffect, useState } from 'react';
import BasicButton from '../components/BasicButton';
const QuestionPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [createdAt, setCreatedAt] = useState([]);
  const [modifiedAt, setModifiedAt] = useState([]);
  const [comments, setComments] = useState([]);
  const [answer, setAnswer] = useState([])
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditAnswer = () => {
    setIsEditMode(!isEditMode);
  };
  const handleDeleteAnswer = () => {};
  const handleSubmitEditAnswer = () => {};

  const Question = 
    {content : '호이스팅이란?',
    questionCategory: '자바스크립트',
    createdAt : '2022.03.13',
    modifiedAt: '2022.03.15',
    answer : [
      {
        writer :'changhoon',
        likes:33,
        content : '자바스크립트에서 선언된 변수, 함수들 모두 끌어올려 유효범위 내의 최상단에 선언하는 것을 말합니다.함수 호이스팅이 발생하는 원인 : 자바스크립트 변수 생성과 초기화(선언과 할당)가 분리되어 진행되기 때문이다.',
        comment : [{
          commentWriter: '천년개발자',
          content:
            '실행컨텍스트와 연관지어 답한다면 더 훌륭한 답변이 될 것 같습니다!',
          profileImg:
            'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
          modifiedAt: '2022.09.25',
          likes: '33',
        },
        {
          commentWriter: 'SEB39_FE_dev',
          content: '너무 좋은 답변이라고 생각합니다!',
          profileImg:
            'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
          modifiedAt: '2022.09.20',
          likes: '1',
        }
      ]
      }
    ]
  }
  
  useEffect(() => {
    setContent(Question.content)
    setCategory(Question.questionCategory)
    setCreatedAt(Question.createdAt)
    setModifiedAt(Question.modifiedAt)
    setAnswer(Question.answer)
  },[])
  return (
    <>
      <BorderLayout>
        <Title>{content}</Title>
        <ContentInfo>
          <Category themeState={themeState}>{category}</Category>
          <Writer>
            <img
              src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png'
              alt='프로필사진'
            />
            TouslesjoursMail
          </Writer>
          <Date>{createdAt}</Date>
          {isEditMode ? (
            <>
              <EditDelete onClick={() => handleSubmitEditAnswer()}>
                등록
              </EditDelete>
              <EditDelete onClick={() => handleEditAnswer()}>취소</EditDelete>
            </>
          ) : (
            <>
              <EditDelete onClick={() => handleEditAnswer()}>수정</EditDelete>
              <EditDelete onClick={() => handleDeleteAnswer()}>삭제</EditDelete>
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
            text={'답변등록'}
          />
        </CenterWrapper>
        {answer.map((el,i)=>(
        <AnswerCard
        profileImg='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png'
        writer={el.writer}
        modifiedAt='2022.09.20'
        content={el.content}
        likes={el.likes}
        comment={el.comment}
      />
      )
        
        
        
        )}
      </BorderLayout>
    </>
  );
};

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
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
  color: var(--color-white);
  text-align: center;
  background-color: ${(props) =>
    props.themeState === 'light'
      ? ' var(--color-orange)'
      : 'var(--color-dark-bg-color)'};
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

const CenterWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 0.5%;
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
    props.themeState === 'light' ? 'var(--color-black)' : 'var(--color-white)'};
`;

export default QuestionPage;
