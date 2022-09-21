import styled from "styled-components"
import { useSelector } from "react-redux";

const Comment = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme
    return (
        <Layout themeState>
            <CommentInfo>
            <div id = 'comment-writer'>
                <img src={props.profileImg} alt='프로필사진'/>
                {props.commentWriter}
            </div>
            <CommentEvent>
              <div id='date'>{props.modifiedAt}</div>
              <div className="edit">수정</div>
              <div className="edit">삭제</div>
              <div id='likes'>
              ❤️{props.likes}
              </div>
            </CommentEvent>
            </CommentInfo>
            <CommentContent>
            {props.content}
            </CommentContent>
        </Layout>
    )
}

const Layout = styled.div`
  margin: 1rem 0;
  border-bottom:  1px solid #d4d4d4;
  width:120rem;
  background: ${(props)=>props.themeState === 'light' ? 'var(--color-white)':'var(--color-gray)'};
  @media screen and (max-width:767px) {
    width: 27.6rem;
  }
`
const CommentInfo = styled.div`
  display:flex;
  margin-bottom: 0.3rem;
  #comment-writer{
    font-weight: bold;
    img{
      display:inline;
      height: 2.4rem;
      width: 2.4rem;
      border-radius: 0.3rem;
      margin-right:0.3rem;
    }
  }
  @media screen and (max-width:767px){
    width: 27.6rem;
  }
  
`
const CommentEvent = styled.div`
  display:flex;
  margin-left: auto;
  #date{
    font-size:1.2rem;
    margin-right: 1rem;
  }
  #likes{
    font-weight: bold;
    cursor: pointer;
  }
  .edit{
    color: #d4d4d4;
    cursor: pointer;
  }
  @media screen and (max-width:767px){
    vertical-align:bottom;
    #date{
    font-size:1.2rem;
    margin-right: 0rem;
  }
    .edit{
      font-size: 1.2rem;
    }
  }
`
const CommentContent = styled.div`
    @media screen and (max-width:767px){
    width: 27.6rem;
  }
`

export default Comment