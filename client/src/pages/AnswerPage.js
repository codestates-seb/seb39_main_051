import AnswerCard from "../components/AnswerCard";
import { useSelector } from 'react-redux';
import styled from "styled-components"
import BorderLayout from "../components/BorderLayout";
const AnswerPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
    const comment = [{
        commentWriter : '천년개발자',
        content : '실행컨텍스트와 연관지어 답한다면 더 훌륭한 답변이 될 것 같습니다!',
        profileImg : 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
        modifiedAt : '2022.09.25',
        likes:'33'
      },{
        commentWriter : 'SEB39_FE_dev',
        content : '너무 좋은 답변이라고 생각합니다!',
        profileImg : 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
        modifiedAt : '2022.09.20',
        likes:'1'
      }]
    return(
        <>
        <BorderLayout>
                <Title>
                호이스팅(hoisting)이란?
                </Title>
                <ContentInfo>
                    <Category themeState={themeState}>데이터베이스</Category>
                    <Writer>
                    <img src='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png' alt='프로필사진'/>
                    TouslesjoursMail
                      </Writer>
                    <Date>2022.10.22</Date>
                    <EditDelete>수정</EditDelete>
                    <EditDelete>삭제</EditDelete>
                </ContentInfo>
                <CommentToTal themeState={themeState}> 답변  {comment.length}개</CommentToTal>
                <AnswerCard profileImg='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png' writer='작성자' modifiedAt='2022.09.20' content='자바스크립트에서 선언된 변수, 함수들 모두 끌어올려 유효범위 내의 최상단에 선언하는 것을 말합니다.함수 호이스팅이 발생하는 원인 : 자바스크립트 변수 생성과 초기화(선언과 할당)가 분리되어 진행되기 때문이다.' likes='33' comment={comment}/>
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
  min-width: 8.8rem;
`
const EditDelete = styled.div`
  color:#d2d2d2;
  margin-right: 0.5%;
  cursor: pointer;
`
const Writer = styled.div`
  margin-right:1rem;
  min-width: 11.8rem;
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
export default AnswerPage