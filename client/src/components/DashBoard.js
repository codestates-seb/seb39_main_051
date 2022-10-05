import styled from 'styled-components';
import CategoryCard from './CategoryCard';
import Toast from './Toast';

const DashBoard = ({ handleSubscribe, category, subscribeArr }) => {
  return (
    <>
      <Title>대쉬보드</Title>
      <Toast />
      <Category>
        {category.map((el) => (
          <CategoryCard
            key={el.questionCategoryId}
            categoryName={el.categoryName}
            questionCategoryId={el.questionCategoryId}
            handleClick={handleSubscribe}
            isSubscribe={subscribeArr.includes(el.questionCategoryId)}
          />
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 60%;
  }
`;

export default DashBoard;
