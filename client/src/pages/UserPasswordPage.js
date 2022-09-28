import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import BorderLayout from '../components/BorderLayout';
import UserPassword from '../components/UserPassword';

const UserPasswordPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const handleClick = (e) => {};

  return (
    <>
      <BorderLayout>
        <Layout>
          <LeftContent themeState={themeState}>
            <div className='mobile'>
              <a href='/mypage'>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size='2x'
                  className='icon'
                />
              </a>
              <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
              <form>
                <UserPasswordInput
                  id='password'
                  themeState={themeState}
                  type='password'
                  placeholder='현재 비밀번호'
                />
                <UserPasswordInput
                  id='newpassword'
                  themeState={themeState}
                  type='password'
                  placeholder='새 비밀번호'
                />
                <UserPasswordInput
                  id='checkpassword'
                  themeState={themeState}
                  type='password'
                  placeholder='새 비밀번호 확인'
                />
                <BasicButton
                  themeState={themeState}
                  width='30%'
                  height='3rem'
                  color='var(--color-white)'
                  backGroundColor='var(--color-orange)'
                  fontSize='1.3rem'
                  text='변경하기'
                />
              </form>
            </div>
            <div className='web'>
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
                  selected
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
            </div>
          </LeftContent>
          <RightContent themeState={themeState}>
            <UserPassword />
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

  @media screen and (max-width: 1025px) {
    height: 70rem;
  }
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

    .mobile {
      .icon {
        color: var(--color-black);
        margin-bottom: 2rem;
      }

      form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        height: 100%;
      }
    }
  }

  @media screen and (min-width: 1026px) {
    .mobile {
      display: none;
    }

    .web {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
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

const UserPasswordInput = styled.input`
  width: 100%;
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

export default UserPasswordPage;
