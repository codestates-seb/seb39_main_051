import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';

const UserName = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <Title>닉네임 변경</Title>
      <ContentWrapper>
        <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
        <div>
          <UserNameInput
            themeState={themeState}
            placeholder='변경할 닉네임을 입력하세요.'
          />
          <BasicButton
            themeState={themeState}
            width='20%'
            height='3rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.3rem'
            text='변경하기'
          />
        </div>
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & div {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
    justify-content: center;
    align-items: flex-end;
  }
`;

const UserProfileImage = styled.img`
  width: 25rem;
  height: 25rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
`;

const UserNameInput = styled.input`
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

export default UserName;
