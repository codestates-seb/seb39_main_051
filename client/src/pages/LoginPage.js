import styled,{keyframes} from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import { useSelector } from 'react-redux';
import Form from '../components/Form';
import { useEffect, useState } from 'react';
import {useInterval} from 'react-use';
const LoginPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const messageArr = ['리액트', '자바스크립트', '자바', '스프링', '부터']
  const changeMessageArr = ['운영체제','네트워크','알고리즘','자료구조', '데이터베이스까지']
  const [items, setItems] = useState(messageArr)
  const [count, setCount] = useState(0)
  const[play, setPlay] = useState(false)

  useInterval(
    ()=>{
      setItems(messageArr)
      setCount(count+1)
      if(count == 1){
        setCount(0)
        setItems(changeMessageArr)
      }
    }, 
    play ? 6000 : null
  )

  useEffect(()=> {
    const timer = setTimeout(() => {
      setItems(changeMessageArr)
      setPlay(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <NavigationBar themeState={themeState} />
      <Container themeState={themeState}>
        <Wrapper themeState={themeState}>
          <MessageWrapper>
            <Message themeState={themeState}>
              <div>
                응원합니다. 
              </div>
              <div>
                면접 질문 메일 서비스
              </div>
              <div>
                매일메일입니다
              </div>
              <AnimationWrapper className='animated-text'>
                {items.map((item, index)=>( 
                <span key={index}>{item}</span>
                ))}
              </AnimationWrapper>
            </Message>
            <Form status={'login'} />
          </MessageWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 4rem;
  font-size: 1.3rem;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  height: auto;
  margin: 2rem 0;
  padding: 5%;
  width: 85%;
  height: auto;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  border-radius: 1.5rem;
`;
const Message = styled.div`
	font-family: 'Noto Sans KR', sans-serif;
  font-size: 5vh;
  color: var(--color-white);
  @media screen and (max-width:1140px) {
    display:none;
}
`;

const MessageWrapper =styled.div`
  display:flex;
`

const animation = keyframes `
  50% { opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px)}
  60% {opacity: 1; transform: translateY(0) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px)}
  70% {opacity: 1; transform: translateY(0) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px)}
  80% {opacity: 0; transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px)}
`

const AnimationWrapper = styled.span`
  display:inline-block;
  flex-direction:row;
  font-weight:bold;
  width: 70%;
  span{
  display:inline-block;
  opacity: 0;
  animation : ${animation};
  animation-duration: 6s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  span:nth-child(1){
    animation-delay: 0.1s;
  }
  span:nth-child(2){
    animation-delay: 0.2s;
  }
  span:nth-child(3){
    animation-delay: 0.3s;
  }
  span:nth-child(4){
    animation-delay: 0.4s;
  }
  span:nth-child(5){
    animation-delay: 0.5s;
  }
`

export default LoginPage;
