import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from '../../components/BasicButton';
import BorderLayout from '../../components/BorderLayout';
import UserPassword from '../../components/UserPassword';
import axiosInstance from '../../utils/axiosInstance';

const UserPasswordPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const {userPicture} = useSelector((state) => state.userInfoSlice);

  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [passwordDesc, setPasswordDesc] = useState('');
  const [rePasswordDesc, setRePasswordDesc] = useState('');
  const [inputValue, setInputValue] = useState({
    newPassword: '',
    checkPassword: '',
  });
  const { newPassword, checkPassword } = inputValue;

  const regNumber = /[0-9]/g;
  const regString = /[a-zA-Z]/g;
  const regSpecialCharacter =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

  const passwordValidation = () => {
    if (
      7 < newPassword.length &&
      newPassword.length < 21 &&
      regNumber.test(newPassword) &&
      regString.test(newPassword) &&
      regSpecialCharacter.test(newPassword)
    ) {
      setPasswordValid(true);
      setPasswordDesc('');
    } else {
      setPasswordValid(false);
      setPasswordDesc(
        '8~20자 영문 대 소문자, 숫자, 특수문자를 포함하여야 합니다. '
      );
    }
  };

  const rePasswordValidation = () => {
    if (checkPassword === newPassword) {
      setRePasswordValid(true);
      setRePasswordDesc('');
    } else {
      setRePasswordValid(false);
      setRePasswordDesc('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    if (!newPassword || !checkPassword) {
      alert('새 비밀번호를 작성해주세요.');
      return;
    }

    if (passwordValid & rePasswordValid) {
      try {
        axiosInstance
          .patch('/my-page/patch', {
            password: newPassword,
          })
          .then((res) => {
            alert('비밀번호가 변경되었습니다.');
          });
      } catch (err) {
        alert('비밀 번호 조건에 따라 작성해주세요.');
      }
    }
  };

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
              <UserProfileImage src={userPicture} />
              <form>
                <UserPasswordInput
                  className='newPassword'
                  name='newPassword'
                  themeState={themeState}
                  type='password'
                  placeholder='새 비밀번호'
                  onChange={handleInput}
                  onKeyUp={passwordValidation}
                />
                <div className='warning'>
                  <span>{passwordDesc}</span>
                </div>
                <UserPasswordInput
                  className='checkPassword'
                  name='checkPassword'
                  themeState={themeState}
                  type='password'
                  placeholder='새 비밀번호 확인'
                  onChange={handleInput}
                  onKeyUp={rePasswordValidation}
                />
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
            </div>
            <div className='web'>
              <UserProfileImage src={userPicture} />
              <a href='/mypage'>
                <BasicButton
                  themeState={themeState}
                  width='100%'
                  height='4rem'
                  color='var(--color-white)'
                  backGroundColor='var(--color-orange)'
                  fontSize='1.8rem'
                  text='대쉬보드'
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
                  selected
                />
              </a>
            </div>
          </LeftContent>
          <RightContent themeState={themeState}>
            <UserPassword
              handleInput={handleInput}
              handleOnClick={handleOnClick}
              passwordValidation={passwordValidation}
              rePasswordValidation={rePasswordValidation}
              passwordDesc={passwordDesc}
              rePasswordDesc={rePasswordDesc}
            />
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

        .warning {
          position: relative;
          bottom: 3rem;
          display: flex;
          justify-content: start;
          width: 100%;
        }
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
