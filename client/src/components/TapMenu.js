import { useSelector } from 'react-redux';
import styled from 'styled-components';

const TapMenu = ({ type }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <TapWrapper themeState={themeState}>
        {type === 'answer' ? (
          <>
            <div>전체</div>
            <div>자바</div>
            <div>자바스크립트</div>
            <div>리액트</div>
            <div>스프링</div>
            <div>자료구조</div>
            <div>알고리즘</div>
            <div>운영체제</div>
            <div>데이터베이스</div>
            <div>네트워크</div>
          </>
        ) : type === 'free' ? (
          <>
            <div>전체</div>
            <div>취업 정보</div>
            <div>고민 상담</div>
            <div>유머</div>
            <div>잡담</div>
          </>
        ) : (
          <>
            <div>전체</div>
            <div>질문 추가</div>
            <div>질문 수정</div>
            <div>기타</div>
          </>
        )}
      </TapWrapper>
    </>
  );
};

const TapWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  height: fit-content;
  font-size: 1.3rem;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  border-radius: 1.5rem;
  color: var(--color-white);
  margin: 1rem 0;

  & div {
    display: flex;
    align-items: center;
    word-break: keep-all;
    height: 4rem;
    margin: 0 1rem;
    cursor: pointer;
  }
`;

export default TapMenu;
