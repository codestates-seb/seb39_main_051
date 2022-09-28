import styled,{keyframes} from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import { useSelector } from 'react-redux';
import Form from '../components/Form';
import {useState } from 'react';
const LoginPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const messageArr = ['실력을', '기르는', '습관', '매일메일과', '함께']
  const [items, setItems] = useState(messageArr)

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
  0% { opacity: 0; transform: translateY(-100px) skewX(10deg) skewY(10deg); filter: blur(10px)}
  25% {opacity: 1; transform:  translateY(0px) skewX(0deg)  skewY(0deg) ; filter: blur(0px)}
  75% {opacity: 1; transform:  translateY(0px) skewX(0deg)  skewY(0deg)  ; filter: blur(0px)}
  100% {opacity: 0; transform: translateY(-100px) skewX(10deg)  skewY(10deg); filter: blur(10px)}
`

const AnimationWrapper = styled.span`
  display:inline-block;
  flex-direction:row;
  font-weight:bold;
  width:80%;
  span{
  display:inline-block;
  opacity: 0;
  animation : ${animation};
  animation-duration: 6s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  /* animation-direction: alternate; */
  margin:1%
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
