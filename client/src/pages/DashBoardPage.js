import {
  faReact,
  faJava,
  faSquareJs,
} from '@fortawesome/free-brands-svg-icons';
import {
  faNetworkWired,
  faDatabase,
  faLeaf,
  faFolderTree,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import BorderLayout from '../components/BorderLayout';
import DashBoard from '../components/DashBoard';

const DashBoardPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const category = [
    faSquareJs,
    faJava,
    faReact,
    faLeaf,
    faFolderTree,
    faGear,
    faDatabase,
    faNetworkWired,
  ];

  return (
    <>
      <BorderLayout>
        <Layout>
          <LeftContent themeState={themeState}>
            <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
            <a href='/mypage' className='web'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='대쉬보드'
                selected
              />
            </a>
            <SubscribeWrapper themeState={themeState}>
              {category.map((el) => (
                <LogoWrapper themeState={themeState}>
                  <FontAwesomeIcon icon={el} size='2x' />
                </LogoWrapper>
              ))}
            </SubscribeWrapper>
            <a href='/userimg'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='프로필 사진 변경'
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

  @media screen and (max-width: 1025px) {
    width: 100%;
    margin: 0;

    a {
      width: 100%;
      height: 4rem;
      margin: 2rem 0;
    }

    .web {
      display: none;
    }
  }
`;

const UserProfileImage = styled.img`
  display: block;
  width: 25rem;
  height: 25rem;
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
  border-radius: 1.5rem;
  padding: 5rem;

  @media screen and (max-width: 1025px) {
    display: none;
  }
`;

const SubscribeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 1rem;
  place-items: center;
  width: 100%;
  height: fit-content;
  background-color: ${(props) =>
    props.themeState === 'light'
      ? 'var(--color-white)'
      : 'var(--color-dark-bg-color)'};
  border: 0.7rem solid
    ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-orange)'
        : 'var(--color-gray)'};
  border-radius: 1rem;
  padding: 1rem 0;

  @media screen and (min-width: 1026px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background-color: ${(props) =>
    props.themeState === 'light'
      ? 'var(--color-orange)'
      : 'var(--color-black)'};
  border-radius: 1rem;
`;

export default DashBoardPage;
