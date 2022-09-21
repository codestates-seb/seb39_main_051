import styled, { css } from 'styled-components';
import DropDownMenu from './DropDownMenu';

const NavigationBar = (props) => {
  const isLoggedin = true;

  return (
    <>
      <NavBar>
        <NavBarLogo themeState={props.themeState}>로고</NavBarLogo>
        <DropDown mobile>
          <img
            className='mobile'
            width='35rem'
            src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Font_Awesome_5_solid_bars.svg'
          />
          <DropDownMenu mobile themeState={props.themeState} />
        </DropDown>
        <DropDown web>
          <NavBarMenu web themeState={props.themeState}>
            <span>질문 답변 공유 게시판</span>
            <span>자유 게시판</span>
            <span>건의 게시판</span>
          </NavBarMenu>
          <DropDownMenu themeState={props.themeState} />
        </DropDown>
        {isLoggedin ? (
          <NavBarRight web themeState={props.themeState}>
            <NavBarButton themeState={props.themeState}>
              마이페이지
            </NavBarButton>
            <span>닉네임</span>
          </NavBarRight>
        ) : (
          <NavBarRight web>
            <NavBarButton themeState={props.themeState}>로그인</NavBarButton>
            <NavBarButton themeState={props.themeState}>회원가입</NavBarButton>
          </NavBarRight>
        )}
      </NavBar>
    </>
  );
};

const NavBar = styled.div`
  position: fixed;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  color: var(--color-white);

  @media screen and (min-width: 701px) {
    justify-content: space-around;
    .mobile {
      display: none;
    }
  }
`;

const NavBarLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  font-size: 1.6rem;
  width: 28rem;
  height: 4rem;

  @media screen and (min-width: 701px) {
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

  & span {
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
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

  @media screen and (max-width: 700px) {
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

  @media screen and (max-width: 700px) {
    ${(props) => {
      if (props.web) {
        return css`
          display: none;
        `;
      }
    }}
  }

  @media screen and (min-width: 701px) {
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
