import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axiosInstance from '../utils/axiosInstance';
import { setCookie } from '../utils/cookie';
import BasicButton from './BasicButton';

const UserName = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const {userPicture} = useSelector((state)=>state.userInfoSlice)

  const [nickName, setNickName] = useState(
    useSelector((state) => state.userInfoSlice).nickName
  );

  const handleInput = (e) => {
    setNickName(e.target.value);
  };

  const handleOnClick = () => {
    axiosInstance
      .patch('/my-page/patch', {
        nickname: nickName,
      })
      .then((res) => {
        setCookie('nickname', nickName, 60);
        alert('닉네임이 변경되었습니다.');
        window.location.reload();
      });
  };

  return (
    <>
      <Title>닉네임 변경</Title>
      <ContentWrapper>
        <UserProfileImage src={userPicture} />
        <div>
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
