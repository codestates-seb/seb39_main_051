import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';

const UserPassword = ({
  handleOnClick,
  handleInput,
  passwordValidation,
  rePasswordValidation,
  passwordDesc,
  rePasswordDesc,
}) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <Title>비밀번호 변경</Title>
      <ContentWrapper>
        <form>
          <InputWrapper themeState={themeState}>
            <label htmlFor='newPassword'>새 비밀번호: </label>
            <UserPasswordInput
              id='newPassword'
              name='newPassword'
              themeState={themeState}
              type='password'
              onChange={handleInput}
              onKeyUp={passwordValidation}
            ></UserPasswordInput>
          </InputWrapper>
          <div className='warning'>
            <span>{passwordDesc}</span>
          </div>
          <InputWrapper themeState={themeState}>
            <label htmlFor='checkPassword'>새 비밀번호 확인: </label>
            <UserPasswordInput
              id='checkPassword'
              name='checkPassword'
              themeState={themeState}
              type='password'
              onChange={handleInput}
              onKeyUp={rePasswordValidation}
            ></UserPasswordInput>
          </InputWrapper>
          <div className='warning'>
            <span>{rePasswordDesc}</span>
          </div>
          <BasicButton
            themeState={themeState}
            width='30%'
            height='3rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.3rem'
            text='변경하기'
            onClick={handleOnClick}
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
    width: fit-content;

    & div {
      display: flex;
      justify-content: space-between;
    }

    .warning {
      position: relative;
      bottom: 3rem;
      display: flex;
      justify-content: start;
      width: 100%;
    }
  }
`;

const UserPasswordInput = styled.input`
  width: 50rem;
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
  justify-content: flex-end;
  width: 100%;
  height: 4rem;
  margin: 4rem 0;

  & label {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    white-space: nowrap;
  }
`;

export default UserPassword;
