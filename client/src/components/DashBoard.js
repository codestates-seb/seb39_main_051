import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CategoryCard from './CategoryCard';

const DashBoard = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const category = [
    '자바',
    '자바스크립트',
    '리액트',
    '스프링',
    '자료구조',
    '알고리즘',
    '운영체제',
    '데이터베이스',
    '네트워크',
  ];

  return (
    <>
      <Title>대쉬보드</Title>
      <Category>
        {category.map((el) => (
          <CategoryCard themeState={themeState} key={el} name={el} />
        ))}
      </Category>
    </>
  );
};

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5%;
`;

const Category = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 2%;
  place-items: center;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 20%;
  }
`;

export default DashBoard;
