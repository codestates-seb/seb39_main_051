import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import { useSelector } from 'react-redux';

const BorderLayout = ({ children }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <NavigationBar themeState={themeState} />
      <Container themeState={themeState}>
        <Wrapper themeState={themeState}>{children}</Wrapper>
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
  padding:5%;
  width:85%;
  height: auto;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-white)' : 'var(--color-black)'};
  border: ${(props)=>props.themeState==='light'? '1rem solid var(--color-orange);' : '1rem solid var(--color-gray);' };
  border-radius: 1.5rem;

`;
export default BorderLayout;
