import { useState } from 'react';
import styled from 'styled-components';

const DropDownList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [seleted, setSelected] = useState('자바');

  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (e) => {
    setSelected(e.dataValue);
  };

  return (
    <>
      <StyledUl onClick={handleClick}>
        {isOpen ? (
          <>
            <li dataValue='자바' onClick={handleSelect}>
              자바
            </li>
            <li dataValue='자바스크립트' onClick={handleSelect}>
              자바스크립트
            </li>
            <li dataValue='리액트' onClick={handleSelect}>
              리액트
            </li>
            <li dataValue='스프링' onClick={handleSelect}>
              스프링
            </li>
            <li dataValue='자료구조' onClick={handleSelect}>
              자료구조
            </li>
            <li dataValue='알고리즘' onClick={handleSelect}>
              알고리즘
            </li>
            <li dataValue='운영체제' onClick={handleSelect}>
              운영체제
            </li>
            <li dataValue='데이터베이스' onClick={handleSelect}>
              데이터베이스
            </li>
            <li dataValue='네트워크' onClick={handleSelect}>
              네트워크
            </li>
          </>
        ) : (
          <li dataValue={`${seleted}`}>1</li>
        )}
      </StyledUl>
    </>
  );
};

const StyledUl = styled.ul`
  max-width: 20rem;
  font-size: 1.8rem;
  background-color: var(--color-orange);

  & li {
    padding: 0.5rem 1rem;
    z-index: 2;
    cursor: pointer;
  }
`;

export default DropDownList;
