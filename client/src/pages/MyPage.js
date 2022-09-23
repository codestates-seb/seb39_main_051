import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import BorderLayout from '../components/BorderLayout';
import DashBoard from '../components/DashBoard';
import UserImg from '../components/UserImg';
import UserName from '../components/UserName';
import ChangePassword from '../components/ChangePassword';

const MyPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const [menu, setMenu] = useState('대쉬보드');

  let content = null;

  switch (menu) {
    case '대쉬보드':
      content = <DashBoard />;
      break;
    case '프로필 사진 변경':
      content = <UserImg />;
      break;
    case '닉네임 변경':
      content = <UserName />;
      break;
    case '비밀번호 변경':
      content = <ChangePassword />;
      break;
  }

  const handleClick = (e) => {
    setMenu(e.target.innerText);
  };

  return (
    <>
      <BorderLayout>
        <Layout>
          <LeftContent themeState={themeState}>
            <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
            <BasicButton
              themeState={themeState}
              width='80%'
              height='4rem'
              color='var(--color-white)'
              backGroundColor='var(--color-orange)'
              fontSize='1.8rem'
              text='대쉬보드'
              onClick={handleClick}
            />
            <BasicButton
              themeState={themeState}
              width='80%'
              height='4rem'
              color='var(--color-white)'
              backGroundColor='var(--color-orange)'
              fontSize='1.8rem'
              text='프로필 사진 변경'
              onClick={handleClick}
            />
            <BasicButton
              themeState={themeState}
              width='80%'
              height='4rem'
              color='var(--color-white)'
              backGroundColor='var(--color-orange)'
              fontSize='1.8rem'
              text='닉네임 변경'
              onClick={handleClick}
            />
            <BasicButton
              themeState={themeState}
              width='80%'
              height='4rem'
              color='var(--color-white)'
              backGroundColor='var(--color-orange)'
              fontSize='1.8rem'
              text='비밀번호 변경'
              onClick={handleClick}
            />
            <BasicButton
              themeState={themeState}
              width='80%'
              height='4rem'
              color='var(--color-white)'
              backGroundColor='var(--color-orange)'
              fontSize='1.8rem'
              text='회원 탈퇴'
            />
          </LeftContent>
          <RightContent themeState={themeState}>{content}</RightContent>
        </Layout>
      </BorderLayout>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;

  button {
    margin: 2rem 0;
  }
`;

const UserProfileImage = styled.img`
  display: block;
  width: 80%;
  height: 30%;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1rem solid var(--color-orange);
  padding: 5rem;
`;

export default MyPage;
