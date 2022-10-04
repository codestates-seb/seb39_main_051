import styled from 'styled-components';
import { useSelector } from 'react-redux';

const PostSummary = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const date = props.createdAt .split('.')[0].replace(/-/g, '.').replace(/T/,'/')
  return (
    <PostCardLayout themeState={themeState}>
      <PostCardWrapper>
        <PostCardTitle onClick={props.onClick}>{props.title}</PostCardTitle>
        <PostCardInfo>
          <CategoryWrapper>{props.category}</CategoryWrapper>
          <WriterCreatedAt>
            {props.likes ? <div>❤️ {props.likes}</div> : <></>}
            <img src={props.picture} />
            <div>{props.writer}</div>
            <div>{date}</div>
          </WriterCreatedAt>
        </PostCardInfo>
      </PostCardWrapper>
    </PostCardLayout>
  );
};
const PostCardLayout = styled.div`
  font-size: 1.8rem;
  border-bottom: 1px solid #8d8d8d;
  background-color: ${(props) =>
    props.themeState === 'light' ? '#FEDD89' : 'var(--color-gray )'};
    color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-gray)' : 'var(--color-white)'};
    width: 100%;
  @media screen and (max-width: 413px) {
    font-size: 1.5rem;
    width: 36rem;
    height: 10rem;
    padding: 3%;
  }
`;

const PostCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin:1%;
  /* border:1px solid blue; */
  @media screen and (max-width: 413px) {
    align-items:stretch;
    flex-direction: column;
    height: 100%;
    margin:1%;
  }
`;

const PostCardTitle = styled.a`
  flex: 4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  /* border: 1px solid red; */
  cursor: pointer;
  @media screen and (max-width: 413px) {
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
  align-items: center;
  font-weight: bold;
  @media screen and (max-width: 413px) {
    justify-content: space-between;
    font-size: 1.2rem;
  }
`;

const WriterCreatedAt = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-left: 1rem;
  }
`;

const CategoryWrapper = styled.div`
  margin: 0 1rem;
  @media screen and (max-width: 413px) {
    margin: 0;
  }
`;

export default PostSummary;
