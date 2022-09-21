import CategoryCard from "../components/CategoryCard";
import PostCard from "../components/PostCard";
import Form from '../components/Form'
import AnswerCard from "../components/AnswerCard";

const HomePage = () => {
  const arr = ['리액트', '자바스크립트', '자바', '스프링', '자료구조', '알고리즘', '네트워크', '데이터베이스']
  const comment = [{
    commentWriter : 'changhoon',
    content : '댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용',
    profileImg : 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
    modifiedAt : '2022.09.20',
    likes:'33'
  },
  {
    commentWriter : 'changhoon',
    content : '댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용',
    profileImg : 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png',
    modifiedAt : '2022.09.20',
    likes:'33'
  }]
  return (
    <div>
      {arr.map((el)=><CategoryCard  name={el} />)}
      <PostCard title='게시글 제목 입니다. 게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.게시글 제목 입니다.' category='React' likes='3' writer = '글쓴이입니다!' createdAt = '2022.02.09' />
      <Form status='signUp'/>
      <AnswerCard profileImg='https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58522/orange-square-emoji-clipart-xl.png' writer='작성자' modifiedAt='2022년09월20일' content='JavaScript에서 호이스팅(hoisting)이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 
  의미합니다.' likes='33' comment={comment}/>
    </div>
  )
};

export default HomePage;
