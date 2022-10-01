import styled from 'styled-components';
import DarkModeSwitch from './DarkModeSwitch';
const DropDownMenu = (props) => {
  return (
    <>
      {props.mobile ? (
        <ItemListWrapper mobile themeState={props.themeState}>
          <ItemList mobile>
            <a href='/questions'>질문 답변 공유 게시판</a>
            <a href='/free'>자유 게시판</a>
            <a href='/suggestion'>건의 게시판</a>
            <a href='/login'>로그인</a>
            <a href='/signup'>회원가입</a>
            <DarkModeSwitch />
          </ItemList>
        </ItemListWrapper>
      ) : (
        <ItemListWrapper themeState={props.themeState}>
          <ItemList>
            <a href='/questions/Java'>
              <span>Java</span>
            </a>
            <a href='/questions/Javascript'>
              <span>Javascript</span>
            </a>
            <a href='/questions/React'>
              <span>React</span>
            </a>
            <a href='/questions/Spring'>
              <span>Spring</span>
            </a>
            <a href='/questions/Data Structure'>
              <span>Data Structure</span>
            </a>
            <a href='/questions/Operating System'>
              <span>Operating System</span>
            </a>
            <a href='/questions/Database'>
              <span>Database</span>
            </a>
            <a href='/questions/Network'>
              <span>Network</span>
            </a>
          </ItemList>
          <ItemList>
            <a href='/free/취업 정보'>
              <span>취업정보</span>
            </a>
            <a href='/free/고민 상담'>
              <span>고민상담</span>
            </a>
            <a href='/free/유머'>
              <span>유머</span>
            </a>
            <a href='/free/잡담'>
              <span>잡담</span>
            </a>
          </ItemList>
          <ItemList>
            <a href='/suggestion/질문 추가 요청'>
              <span>질문 추가 요청</span>
            </a>
            <a href='/suggestion/질문 수정 요청'>
              <span>질문 수정 요청</span>
            </a>
            <a href='/suggestion/기타'>
              <span>기타</span>
            </a>
          </ItemList>
        </ItemListWrapper>
      )}
    </>
  );
};

const ItemListWrapper = styled.div`
  display: none;
  position: absolute;
  width: ${(props) => (props.mobile ? 'fit-content' : '52.5rem')};
  padding-left: ${(props) => (props.mobile ? '0' : '2rem')};
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  right: 0px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  padding: 0.5rem;
  font-size: 1.6rem;
  line-height: 2.5rem;
  color: ${(props) =>
    props.themeState === 'light'
      ? 'var(--color-black)'
      : 'var(--color-white);'};

  & a {
    color: var(--color-white);
    text-decoration: none;
  }

  & span {
    cursor: pointer;
  }

  &:nth-child(1) {
    margin: ${(props) => (props.mobile ? '0 2rem' : '0 0 0 2rem')};
  }

  &:nth-child(2) {
    margin-left: 6rem;
  }

  &:nth-child(3) {
    margin-left: 3rem;
  }
`;

export default DropDownMenu;
