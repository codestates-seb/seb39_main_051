import styled from 'styled-components';
import { useSelector } from 'react-redux';
import BasicButton from './BasicButton';
import Comment from './Comment';
import { useState } from 'react';
const AnswerCard = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const [isCommentShow, setIsCommentShow] = useState(false);
  const toggleCommentShow = () => {
    setIsCommentShow(!isCommentShow);
    return;
  };
  
  return (
    <Layout themeState={themeState}>
      <AnswerInfo>
        <AnswerWriter>
          <img src={props.profileImg} />
          {props.writer}
        </AnswerWriter>
        <AnswerEvent>
          <div className='answerDate'>{props.modifiedAt}</div>
          <div className='answerEdit'>수정</div>
          <div className='answerEdit'>삭제</div>
          </AnswerEvent>
      </AnswerInfo>
      <AnswerLayout themeState={themeState}>
        <AnswerContent themeState={themeState}>
          <div className='answerContent'>{props.content}</div>
          <div className='answerlikes'>❤️{props.likes}</div>
        </AnswerContent>
      </AnswerLayout>
      <AnswerCommentInput themeState={themeState}>
        <label id='comment' />
        <input placeholder='댓글을 입력하세요' />
        <BasicButton
          text='댓글등록'
          backGroundColor='#ff6c02'
          color='#ffffff'
        />
      </AnswerCommentInput>
      {isCommentShow ? (
        <>
          <ToggleComment themeState onClick={() => toggleCommentShow()}>
            댓글 숨기기
          </ToggleComment>
          {props.comment.map((el) => (
            <Comment
              commentWriter={el.commentWriter}
              content={el.content}
              modifiedAt={el.modifiedAt}
              likes={el.likes}
              profileImg={el.profileImg}
            />
          ))}
        </>
      ) : (
        <>
          <ToggleComment
            themeState
            onClick={() => toggleCommentShow()}
          >{`총 ${props.comment.length} 개의 댓글이 있습니다.`}</ToggleComment>
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
`;
const AnswerInfo = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0.3rem;
`;
const AnswerWriter = styled.div`
  font-weight: bold;
  width: 90%;
  img {
    height: 2.4rem;
    width: 2.4rem;
    margin-right: 0.3rem;
    border-radius: 0.3rem;
  } 
`;
const AnswerEvent = styled.div`
  display:flex;
  font-size: 1.2rem; 
  .answerDate{
    margin-right:0.5rem;
  }
  .answerEdit{
    color: #d4d4d4;
    margin-right:0.5rem;
    cursor: pointer;
  }
  @media screen and (max-width: 412px){
      flex-direction:column;
      vertical-align: bottom;
    }
`;
const AnswerLayout = styled.div`
  display: flex;
  width: 100%;
`;
const AnswerContent = styled.div`
  display: flex;
  width: 100%;
  /* margin-right: 1rem; */
  background: ${(props) =>
    props.themeState === 'light' ? 'var(--color-white)' : 'var(--color-gray)'};
    .answerContent{
      font-size: 2rem;
      width:90%;
      margin-right: 0.5%;
    }
    .answerLikes{
      width:5%;
    }
  @media screen and (max-width: 412px) {
    margin-right: 1rem;
    border: 1px solid #d4d4d4;
  }
`;
const AnswerEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  width: 5%;
  cursor: pointer;
  .edit {
    color: #d4d4d4;
    cursor: pointer;
  }
  @media screen and (max-width: 412px) {
    display: flex;
    flex-direction: column;
  }
`;
const AnswerCommentInput = styled.div`
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
      /* width: 27.6rem; */
      margin-right: 1rem;
      border: 1px solid #d4d4d4;
    }
    button {
      /* width:3rem; */
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

export default AnswerCard;
