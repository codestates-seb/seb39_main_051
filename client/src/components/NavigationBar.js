import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import DropDownMenu from './DropDownMenu';
import DarkModeSwitch from './DarkModeSwitch';
import { useEffect, useState } from 'react';
import { getCookie } from '../utils/cookie';

const NavigationBar = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const [nickName, setNickName] = useState('');

  useEffect(() => {
    if (getCookie('nickname')) {
      setNickName(getCookie('nickname'));
    }
  }, [nickName]);

  const handleOnClick = () => {};

  return (
    <>
      <NavBar themeState={themeState}>
        <NavBarLogo themeState={themeState} href='/'>
          매일 메일
        </NavBarLogo>
        <DropDown mobile>
          <img
            className='mobile'
            width='35rem'
            src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Font_Awesome_5_solid_bars.svg'
          />
          <DropDownMenu mobile themeState={themeState} />
        </DropDown>
        <DropDown web>
          <NavBarMenu web themeState={themeState}>
            <a href='/questions'>질문 답변 공유 게시판</a>
            <a href='/free'>자유 게시판</a>
            <a href='/suggestion'>건의 게시판</a>
          </NavBarMenu>
          <DropDownMenu themeState={themeState} />
        </DropDown>
        {nickName !== '' ? (
          <NavBarRight web themeState={themeState}>
            <DarkModeSwitch>토글</DarkModeSwitch>
            <a href='/mypage'>
              <NavBarButton themeState={themeState}>{nickName}</NavBarButton>
            </a>
            <NavBarButton themeState={themeState} onClick={handleOnClick}>
              로그아웃
            </NavBarButton>
          </NavBarRight>
        ) : (
          <NavBarRight web themeState={themeState}>
            <DarkModeSwitch>토글</DarkModeSwitch>
            <a href='/login'>
              <NavBarButton themeState={themeState}>로그인</NavBarButton>
            </a>
            <a href='/signup'>
              <NavBarButton themeState={themeState}>회원가입</NavBarButton>
            </a>
          </NavBarRight>
        )}
      </NavBar>
    </>
  );
};

const NavBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 4rem;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  color: var(--color-white);

  @media screen and (min-width: 413px) {
    justify-content: space-around;
    .mobile {
      display: none;
    }
  }
`;

const NavBarLogo = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
  color: var(--color-white);
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  font-size: 1.6rem;
  width: 28rem;
  height: 4rem;
  text-decoration: none;

  @media screen and (min-width: 413px) {
    width: 38.3rem;
  }
`;

const NavBarMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  font-size: 1.6rem;
  width: 52.5rem;
  height: 4rem;

  & a {
    cursor: pointer;
    color: var(--color-white);
    text-decoration: none;
  }

  @media screen and (max-width: 412px) {
    ${(props) => {
      if (props.web) {
        return css`
          display: none;
        `;
      }
    }}
  }
`;

const NavBarRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};

  span {
    word-break: keep-all;
    margin: 1rem;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 412px) {
    ${(props) => {
      if (props.web) {
        return css`
          display: none;
        `;
      }
    }}
  }
`;

const NavBarButton = styled.button`
  width: 9.5rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  color: var(--color-white);
  border: none;
  font-size: 1.6rem;
  height: 4rem;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;

  &:hover {
    display: block;
    > div {
      display: flex;
      justify-content: space-around;
    }
  }

  @media screen and (max-width: 412px) {
    ${(props) => {
      if (props.web) {
        return css`
          display: none;
        `;
      }
    }}
  }

  @media screen and (min-width: 413px) {
    ${(props) => {
      if (props.mobile) {
        return css`
          display: none;
        `;
      }
    }}
  }
`;

export default NavigationBar;
