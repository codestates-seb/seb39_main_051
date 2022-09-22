import styled from 'styled-components';

const TapMenu = (props) => {
  return (
    <>
      <TapWrapper
        themeState={props.themeState}
        height={props.height}
        color={props.color}
        backGroundColor={props.backGroundColor}
        fontSize={props.fontSize}
        padding={props.padding}
      >
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
      </TapWrapper>
    </>
  );
};

const TapWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  height: fit-content;
  background-color: ${(props) =>
    props.themeState === 'light' ? props.backGroundColor : 'var(--color-gray)'};
  font-size: ${(props) => props.fontSize};
  border-radius: 1.5rem;
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};

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
