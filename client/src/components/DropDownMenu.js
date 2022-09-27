import styled from 'styled-components';
import DarkModeSwitch from './DarkModeSwitch';
const DropDownMenu = (props) => {
  return (
    <>
      {props.mobile ? (
        <ItemListWrapper mobile themeState={props.themeState}>
          <ItemList mobile>
            <span>질문 답변 공유 게시판</span>
            <span>자유 게시판</span>
            <span>건의 게시판</span>
            <span>로그인</span>
            <span>회원가입</span>
            <DarkModeSwitch />
          </ItemList>
        </ItemListWrapper>
      ) : (
        <ItemListWrapper themeState={props.themeState}>
          <ItemList>
            <span>자바</span>
            <span>자바스크립트</span>
            <span>리액트</span>
            <span>스프링</span>
            <span>자료구조</span>
            <span>알고리즘</span>
            <span>운영체제</span>
            <span>데이터베이스</span>
            <span>네트워크</span>
          </ItemList>
          <ItemList>
            <span>취업정보</span>
            <span>고민상담</span>
            <span>유머</span>
            <span>잡담</span>
          </ItemList>
          <ItemList>
            <span>질문 추가 요청</span>
            <span>질문 수정 요청</span>
            <span>기타</span>
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
