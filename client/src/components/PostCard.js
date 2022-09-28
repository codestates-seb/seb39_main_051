import { useSelector } from 'react-redux';
import Comment from '../components/Comment';
import styled from 'styled-components';
const PostCard = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const comment = [
    {
      commentWriter: 'changhoon',
      content:
        '너무 좋은 답변이라고 생각합니다!생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다생각합니다',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
    {
      commentWriter: 'changhoon',
      content: '너무 좋은 답변이라고 생각합니다!',
      profileImg:
        'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
      modifiedAt: '2022.09.20',
      likes: '33',
    },
  ];
    return(
        <>
        <Title>타이틀</Title>
      <ContentInfo>
        <Category themeState={themeState}>리액트</Category>
        <Writer>
          <img
            src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png'
            alt='프로필사진'
          />
          이창훈
        </Writer>
        <Date>2022.10.22</Date>
        <EditDelete>수정</EditDelete>
        <EditDelete>삭제</EditDelete>
      </ContentInfo>
      <Content>
        자바스립트는 싱글스레드입니다.자바스립트는 싱글스레드입니다.자바스립트는
        싱글스레드입니다.
      </Content>
      <LikesWrapper>
        <div>❤️33</div>
      </LikesWrapper>
      <CommentToTal themeState={themeState}>
        댓글 {comment.length}개
      </CommentToTal>
      {comment.map((el) => (
        <Comment
          commentWriter={el.commentWriter}
          content={el.content}
          profileImg={el.profileImg}
          modifiedAt={el.modifiedAt}
          likes={el.likes}
        />
      ))}
        </>
    )
}

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
  padding: 0.5rem;
  border-radius: 1.5rem;
  color: var(--color-white);
  text-align: center;
  background-color: ${(props) =>
    props.themeState === 'light'
      ? ' var(--color-orange)'
      : 'var(--color-dark-bg-color)'};
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

export default PostCard