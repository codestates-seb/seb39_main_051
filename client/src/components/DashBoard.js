import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CategoryCard from './CategoryCard';
import { toast } from 'react-toastify';

const DashBoard = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const [subscribeArr, setSubscribeArr] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const category = [
    { categoryName: 'React', questionCategoryId: 2 },
    { categoryName: 'Javascript', questionCategoryId: 8 },
    { categoryName: 'Java', questionCategoryId: 1 },
    { categoryName: 'Spring', questionCategoryId: 3 },
    { categoryName: 'Data Structure', questionCategoryId: 4 },
    { categoryName: 'OS', questionCategoryId: 5 },
    { categoryName: 'Database', questionCategoryId: 6 },
    { categoryName: 'Network', questionCategoryId: 7 },
  ];

  const handleSubscribe = (id, categoryName, isSubscribe) => {
    if (isSubscribe) {
      //구독해제상황
      // await axios.post('/member/subscription',{
      //   questionCategoryId:id
      // })
      toast.success(`${categoryName} 구독을 해제합니다!`);
      const origin = subscribeArr;
      setSubscribeArr(origin.filter((el) => el !== id));
    } else {
      if (categoryName === 'Spring') {
        // await axios.post('/member/subscription',{
        //   questionCategoryId:id
        // })
        toast.success(`${categoryName}을 구독합니다!`);
        const origin = subscribeArr;
        origin.push(id);
        setSubscribeArr([...origin]);
      } else {
        // await axios.post('/member/subscription',{
        //   questionCategoryId:id
        // })
        toast.success(`${categoryName}를 구독합니다!`);
        const origin = subscribeArr;
        origin.push(id);
        setSubscribeArr([...origin]);
      }
    }
  };

  return (
    <>
      <Title>대쉬보드</Title>
      <Category>
        {category.map((el, idx) => (
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 20%;
  }
`;

export default DashBoard;
