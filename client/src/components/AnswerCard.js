import styled from "styled-components";
import { useSelector } from "react-redux";
import BasicButton from "./BasicButton";
import Comment from "./Comment";
import { useState } from "react";
const AnswerCard = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme
  const [isCommentShow, setIsCommentShow] = useState(false)

  const toggleCommentShow = () => {
    setIsCommentShow(!isCommentShow)
    return 
  }
    return (
        <Layout themeState>
            <div id='answer-info'>
                <div id='answer-writer'><img src={props.profileImg}/>{props.writer}</div>
                <div id='answer-modifiedAt'>{props.modifiedAt}</div>
            </div>
            <div id='answer'>
            <div id='answer-content'>
                  {props.content}
              </div>
              <div id='answer-content-event'>
                  <div>
                      <div>❤️{props.likes}</div>
                  </div>
                  <div className='edit'>
                      수정
                  </div>
                  <div className='edit'>
                      삭제
                  </div>
            </div>
            </div>
            <div id='answer-comment-input'>
                <label id='comment' />
                <input placeholder="댓글을 입력하세요"/>
                <BasicButton text='댓글등록' backGroundColor='#ff6c02' color='#ffffff' />
            </div>
            {
            isCommentShow ? (
              <>
              <ToggleComment themeState onClick={()=>toggleCommentShow()}>댓글 숨기기</ToggleComment>
              {props.comment.map((el)=><Comment commentWriter={el.commentWriter} content={el.content} modifiedAt={el.modifiedAt} likes={el.likes} profileImg={el.profileImg}/>)}</>
            ) : (
              <>
            <ToggleComment themeState onClick={()=>toggleCommentShow()}>{`총 ${props.comment.length} 개의 댓글이 있습니다.`}</ToggleComment>
            </>
            )
            }
                
        </Layout>
    )
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-size: 1.3rem;
  background-color: ${(props)=> props.themeState==='light' ? '#ffffff' : '#2d2d2d'};
  width: 130rem;
  border: 1px solid #d4d4d4;
  #answer-info{
    display:flex;
    width:120rem;
    margin-bottom: 0.3rem;
    #answer-writer{
      font-weight: bold;
      margin-right: auto;
        img{
          height: 2.4rem;
          width: 2.4rem;
          margin-right:0.3rem;
          border-radius: 0.3rem;
        }
    }
    #answer-modifiedAt{
      font-size: 1.2rem;;
    }
  }
  #answer{
    display:flex;
  }
  #answer-content{
    width:120rem;
    margin-right: 1rem;
    background: ${(props)=>props.themeState === 'light' ? 'var(--color-white)':'var(--color-gray)'}
  }
  #answer-content-event{
    display:flex;
    flex-direction: column;
    font-size: 1.2rem;
    cursor: pointer;
    .edit{
      color: #d4d4d4;
      cursor: pointer;
    }
  }
  #answer-comment-input{
    display:flex;
    margin: 1rem 0;
    input{
      width:120rem;
      margin-right: 1rem;
      border : 1px solid #d4d4d4;
      background: ${(props)=>props.themeState === 'light' ? 'var(--color-white)':'var(--color-gray)'};
      border-radius: 0.3rem;
    }
  }

  @media screen and (max-width: 767px) {
      width: 36rem;
      font-size: 1.5rem;
      #answer-info{
    width: 27.6rem;
    #answer-writer{
      margin-right: auto;
        img{
          height: 2.4rem;
          width: 2.4rem;
          border-radius: 0.3rem;
        }
    }
  }
  #answer{
    display:flex;
  }
  #answer-content{
    width: 27.6rem;
    margin-right: 1rem;
    border : 1px solid #d4d4d4;
  }
  #answer-content-event{
    display:flex;
    flex-direction: column;
  }
  #answer-comment-input{
    display:flex;
    margin: 1rem 0;
    input{
      width: 27.6rem;
      margin-right: 1rem;
      border : 1px solid #d4d4d4;
    }
    button{
      width:3rem;
      font-size: 1rem;
      padding:0.3rem;
    }
  }
  }
`
const ToggleComment = styled.div`
  font-size: 1.2rem;;
  cursor:pointer;
  color:#d2d2d2;
  :hover{
    color:var(--color-white);
  }
`

export default AnswerCard;