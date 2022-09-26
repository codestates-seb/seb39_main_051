import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';

const UserPassword = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <Title>비밀번호 변경</Title>
      <ContentWrapper>
        <form>
          <InputWrapper themeState={themeState}>
            <label htmlFor='password'>현재 비밀번호: </label>
            <UserPasswordInput
              id='password'
              themeState={themeState}
              type='password'
            ></UserPasswordInput>
          </InputWrapper>
          <InputWrapper themeState={themeState}>
            <label htmlFor='newpassword'>새 비밀번호: </label>
            <UserPasswordInput
              id='newpassword'
              themeState={themeState}
              type='password'
            ></UserPasswordInput>
          </InputWrapper>
          <InputWrapper themeState={themeState}>
            <label htmlFor='checkpassword'>새 비밀번호 확인: </label>
            <UserPasswordInput
              id='checkpassword'
              themeState={themeState}
              type='password'
            ></UserPasswordInput>
          </InputWrapper>
          <BasicButton
            themeState={themeState}
            width='20%'
            height='3rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.3rem'
            text='변경하기'
          />
        </form>
      </ContentWrapper>
    </>
  );
};

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
  }
`;

const UserPasswordInput = styled.input`
  width: 50%;
  height: 3rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  color: var(--color-white);
  border: none;
  border-radius: 1.5rem;
  font-size: 1.3rem;
  margin-bottom: 5rem;
  padding-left: 1rem;
  ::placeholder {
    color: var(--color-white);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4rem;
  margin: 4rem 0;

  & label {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export default UserPassword;
