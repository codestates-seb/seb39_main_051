import { useSelector } from 'react-redux';
import styled from 'styled-components';

const TapMenu = ({ type }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <TapWrapper themeState={themeState}>
        {type === 'answer' ? (
          <>
            <a href='/questions'>
              <div>전체</div>
            </a>
            <a href='/questions/Java'>
              <div>Java</div>
            </a>
            <a href='/questions/Javascript'>
              <div>Javascript</div>
            </a>
            <a href='/questions/React'>
              <div>React</div>
            </a>
            <a href='/questions/Spring'>
              <div>Spring</div>
            </a>
            <a href='/questions/Data Structure'>
              <div>Data Structure</div>
            </a>
            <a href='/questions/Operating System'>
              <div>Operating System</div>
            </a>
            <a href='/questions/Database'>
              <div>Database</div>
            </a>
            <a href='/questions/Network'>
              <div>Network</div>
            </a>
          </>
        ) : type === 'free' ? (
          <>
            <a href='/free'>
              <div>전체</div>
            </a>
            <a href='/free/취업 정보'>
              <div>취업정보</div>
            </a>
            <a href='/free/고민 상담'>
              <div>고민상담</div>
            </a>
            <a href='/free/유머'>
              <div>유머</div>
            </a>
            <a href='/free/잡담'>
              <div>잡담</div>
            </a>
          </>
        ) : (
          <>
            <a href='/suggestion'>
              <div>전체</div>
            </a>
            <a href='/suggestion/질문 추가 요청'>
              <div>질문 추가 요청</div>
            </a>
            <a href='/suggestion/질문 수정 요청'>
              <div>질문 수정 요청</div>
            </a>
            <a href='/suggestion/기타'>
              <div>기타</div>
            </a>
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

  & a {
    text-decoration: none;
    color: var(--color-white);
  }
`;

export default TapMenu;
