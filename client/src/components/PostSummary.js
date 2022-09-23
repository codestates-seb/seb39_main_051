import styled from 'styled-components';
import { useSelector } from 'react-redux';

const PostSummary = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  return (
    <PostCardLayout themeState={themeState}>
      <PostCardWrapper>
        <PostCardTitle>{props.title}</PostCardTitle>
        <PostCardInfo>
          <CategoryWrapper>{props.category}</CategoryWrapper>
          <WriterCreatedAt>
            <div>❤️ {props.likes}</div>
            <div>{props.writer}</div>
            <div>{props.createdAt}</div>
          </WriterCreatedAt>
        </PostCardInfo>
      </PostCardWrapper>
    </PostCardLayout>
  );
};
const PostCardLayout = styled.div`
  font-size: 1.3rem;
  border-bottom: 1px solid #8d8d8d;
  background-color: ${(props) =>
    props.themeState === 'light' ? '#FFE57A' : 'var(--color-gray )'};
  padding: 0.3rem 0;
  /* width: 80rem; */
  width:100%;
  padding: 1rem;
  @media screen and (max-width: 412px) {
    width: 36rem;
    height: 10rem;
  }
`;
const PostCardWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 412px) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
const PostCardTitle = styled.a`
  flex: 4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 412px) {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    flex: 9;
  }
`;

const PostCardInfo = styled.div`
  display: flex;
  font-weight: bold;
  @media screen and (max-width: 412px) {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
  }
`;

const WriterCreatedAt = styled.div`
  display: flex;
  div {
    margin: 0 1rem;
  }
`;

const CategoryWrapper = styled.div`
  margin: 0 1rem;
  @media screen and (max-width: 412px) {
    margin: 0;
  }
`;



export default PostSummary;
