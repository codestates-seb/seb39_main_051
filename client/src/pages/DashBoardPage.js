import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import BorderLayout from '../components/BorderLayout';
import DashBoard from '../components/DashBoard';

const DashBoardPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const handleClick = (e) => {};

  return (
    <>
      <BorderLayout>
        <Layout>
          <LeftContent themeState={themeState}>
            <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
            <a href='/mypage'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='대쉬보드'
                onClick={handleClick}
                selected
              />
            </a>
            <a href='/userimg'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='프로필 사진 변경'
                onClick={handleClick}
              />
            </a>
            <a href='/username'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='닉네임 변경'
                onClick={handleClick}
              />
            </a>
            <a href='/userpassword'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='비밀번호 변경'
                onClick={handleClick}
              />
            </a>
            <a>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='회원 탈퇴'
              />
            </a>
          </LeftContent>
          <RightContent themeState={themeState}>
            <DashBoard />
          </RightContent>
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
  min-width: 25rem;
  margin-right: 5rem;

  a {
    width: 80%;
    height: 4rem;
    margin: 2rem 0;
  }

  @media screen and (max-width: 412px) {
    width: 100%;
    margin: 0;

    a {
      width: 100%;
      height: 4rem;
      margin: 2rem 0;
    }
  }
`;

const UserProfileImage = styled.img`
  display: block;
  width: 25rem;
  height: 30rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1rem solid
    ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-orange)'
        : 'var(--color-gray)'};
  padding: 5rem;

  @media screen and (max-width: 412px) {
    display: none;
  }
`;

export default DashBoardPage;
