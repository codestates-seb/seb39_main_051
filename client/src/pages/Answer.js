import AnswerCard from "../components/AnswerCard";
import { useSelector } from 'react-redux';
import styled from "styled-components"
import NavigationBar from "../components/NavigationBar"
import BorderLayout from "../components/BorderLayout";
const Answer = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
    const comment = [{
        commentWriter : 'changhoon',
        content : '너무 좋은 답변이라고 생각합니다!',
        profileImg : 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
        modifiedAt : '2022.09.20',
        likes:'33'
      },{
        commentWriter : 'changhoon',
        content : '너무 좋은 답변이라고 생각합니다!',
        profileImg : 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
        modifiedAt : '2022.09.20',
        likes:'33'
      }]
    return(
        <>
        <BorderLayout>
                <Title>
                    호이스팅에 대하여 대답하시오
                </Title>
                <ContentInfo>
                    <Category themeState={themeState}>리액트</Category>
                    <Writer>
                    <img src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png' alt='프로필사진'/>
                      이창훈
                      </Writer>
                    <Date>2022.10.22</Date>
                    <EditDelete>수정</EditDelete>
                    <EditDelete>삭제</EditDelete>
                </ContentInfo>
                <CommentToTal themeState={themeState}> 답변  {comment.length}개</CommentToTal>
                <AnswerCard profileImg='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png' writer='작성자' modifiedAt='2022.09.20' content='JavaScript에서 호이스팅(hoisting)이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 
  의미합니다.' likes='33' comment={comment}/>
                  <AnswerCard profileImg='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png' writer='작성자' modifiedAt='2022.09.20' content='JavaScript에서 호이스팅(hoisting)이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 
  의미합니다.' likes='33' comment={comment}/>
        </BorderLayout>
        </>
    )
}

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`
const ContentInfo = styled.div`
  display: flex;
  align-items:center;
  margin: 2% 0;
`
const Category = styled.div`
  margin-right:auto;
  padding:1rem;
  border-radius: 1.5rem;
  color : var(--color-white);
  text-align:center;
  background-color:${(props)=>props.themeState ==='light' ? ' var(--color-orange)' : 'var(--color-dark-bg-color)'};
`
const EditDelete = styled.div`
  color:#d2d2d2;
  margin-right: 0.5%;
  cursor: pointer;
`
const Writer = styled.div`
  margin-right:1rem;
  img{
      display:inline;
      height: 2.4rem;
      width: 2.4rem;
      border-radius: 0.3rem;
      margin-right:0.3rem;
    }
`
const Date = styled.div`
  margin-right: 0.5%;
`

const CommentToTal = styled.div`
  font-weight: bold;
  margin-bottom: 0.5%;
  color: ${(props)=>props.themeState === 'light' ? 'var(--color-black)' :'var(--color-white)' };
`
export default Answer