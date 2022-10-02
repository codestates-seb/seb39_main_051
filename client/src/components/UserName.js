import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';

const UserName = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const [nickName, setNickName] = useState(
    useSelector((state) => state.userInfoSlice).nickName
  );

  const headers = {
    Authorization: useSelector(
      (state) => state.userInfoSlice
    ).isLoggedIn.replace('%20', ' '),
  };

  const handleInput = (e) => {
    setNickName(e.target.value);
  };

  const handleOnClick = () => {
    axios
      .patch(
        'http://localhost:8080/my-page/patch',
        {
          email: 'test1@google.com',
          password: '1234qwer~',
          nickname: nickName,
        },
        { headers }
      )
      .then((res) => console.log(res));
  };

  return (
    <>
      <Title>닉네임 변경</Title>
      <ContentWrapper>
        <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
        <div>
          <span>{nickName}</span>
          <UserNameInput
            themeState={themeState}
            placeholder='변경할 닉네임을 입력하세요.'
            onChange={handleInput}
          />
          <BasicButton
            themeState={themeState}
            width='20%'
            height='3rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.3rem'
            text='변경하기'
            onClick={handleOnClick}
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
