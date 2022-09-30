import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import DropDownList from '../components/DropDownList';
import NavigationBar from '../components/NavigationBar';

const PostPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const { type, category } = useLocation().state;

  return (
    <>
      <NavigationBar themeState={themeState} />
      <ContentWrapper>
        <FormWrapper themeState={themeState}>
          <form>
            <h1>게시판이름</h1>
            <InputWrapper themeState={themeState}>
              <input
                id='title'
                name='title'
                type='text'
                placeholder='제목'
                required
              />
            </InputWrapper>
            <DropDownList type={type} category={category} />
            <InputWrapper themeState={themeState}>
              <textarea
                id='body'
                name='body'
                type='text'
                placeholder='내용'
                required
              />
            </InputWrapper>
            <BasicButton
              themeState={themeState}
              width='5.5rem'
              height='4rem'
              color='var(--color-white)'
              backGroundColor='var(--color-orange)'
              fontSize='1.8rem'
              text='등록'
            />
          </form>
        </FormWrapper>
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  min-height: 80rem;
  color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-white)' : 'var(--color-gray)'};
  background-color: ${(props) =>
    props.themeState === 'light'
      ? 'var(--color-white)'
      : 'var(--color-dark-bg-color)'};
  border: ${(props) =>
    props.themeState === 'light'
      ? '1.5rem var(--color-orange) solid'
      : '1.5rem var(--color-gray) solid'};
  border-radius: 1rem;
  padding: 4rem 0;

  & form {
    display: flex;
    flex-direction: column;
    width: 95%;
    h1 {
      font-size: 300%;
      font-weight: bold;
      color: ${(props) =>
        props.themeState === 'light' ? 'var(--color-black)' : '#D2D2D2'};
    }
    select {
      max-width: 20rem;
      height: 4rem;
      font-size: 1.8rem;
      border: none;
      background-color: ${(props) =>
        props.themeState === 'light'
          ? 'var(--color-orange)'
          : 'var(--color-gray)'};
      color: ${(props) =>
        props.themeState === 'light'
          ? 'var(--color-white)'
          : 'var(--color-white)'};
      border-radius: 1rem;
      margin: 2rem 0;
      -webkit-appearance: none; /* 네이티브 외형 감추기 */
      -moz-appearance: none;
      appearance: none;
    }

    option {
      background-color: ${(props) =>
        props.themeState === 'light'
          ? 'var(--color-orange)'
          : 'var(--color-gray)'};
      color: ${(props) =>
        props.themeState === 'light'
          ? 'var(--color-white)'
          : 'var(--color-gray)'};
      -webkit-appearance: none; /* 네이티브 외형 감추기 */
      -moz-appearance: none;
      appearance: none;
    }

    button {
      margin: 2rem 0;
      margin-left: auto;
    }
  }
`;

const InputWrapper = styled.div`
  margin: 1rem 0;

  & input {
    width: 100%;
    height: 4rem;
    font-size: 1.8rem;
    margin: 0.5rem 0;
    color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-black)'
        : 'var(--color-white)'};
    background-color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
    border: 1px solid #d2d2d2;
    border-radius: 0.3rem;
  }

  & textarea {
    width: 100%;
    height: 25rem;
    font-size: 1.8rem;
    resize: none;
    margin: 0.5rem 0;
    color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-black)'
        : 'var(--color-white)'};
    background-color: ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-white)'
        : 'var(--color-gray)'};
    border: 1px solid #d2d2d2;
    border-radius: 0.3rem;
  }
`;

export default PostPage;
