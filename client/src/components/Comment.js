import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Comment = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  return (
    <Layout themeState={themeState}>
      <CommentInfo>
        <CommentWriter>
          <img src={props.profileImg} alt='프로필사진' />
          {props.commentWriter}
        </CommentWriter>

        <CommentEvent>
          <div className='commentDate'>{props.modifiedAt}</div>
          <div className='commentEdit'>수정</div>
          <div className='commentEdit'>삭제</div>
        </CommentEvent>
      </CommentInfo>
      <CommentContent themeState={themeState}>
        <div className='commentContent'>{props.content}</div>
        <div className='commentlikes'>❤️{props.likes}</div>
      </CommentContent>
    </Layout>
  );
};

const Layout = styled.div`
  margin: 1rem 0;
  border-bottom: 1px solid #d4d4d4;
  width: 100%;
  background: ${(props) =>
    props.themeState === 'light' ? 'var(--color-white)' : 'var(--color-gray)'};
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
  @media screen and (max-width: 413px) {
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
  background: ${(props) =>
    props.themeState === 'light' ? 'var(--color-white)' : 'var(--color-gray)'};
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
