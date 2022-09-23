import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import { useSelector } from 'react-redux';
import Form from '../components/Form';
const LoginPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  return (
    <>
      <NavigationBar themeState={themeState} />
      <Container themeState={themeState}>
        <Wrapper themeState={themeState}>
          <MessageWrapper>
            <Message themeState={themeState}>
              <div>
              반갑습니다. 
              </div>
              <div>
                면접질문 메일 서비스
              </div>
              <div>
                SEB_051입니다.
              </div>
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
  /* border: ${(props) =>
    props.themeState === 'light'
      ? '1rem solid var(--color-orange);'
      : '1rem solid var(--color-gray);'}; */
  border-radius: 1.5rem;
`;
const Message = styled.div`
  font-size: 5vh;
  color: var(--color-white);
  div{
    margin-bottom: 5%;
  }
  @media screen and (max-width:1140px) {
    display:none;
}
`;

const MessageWrapper =styled.div`
  display:flex;
`

export default LoginPage;
