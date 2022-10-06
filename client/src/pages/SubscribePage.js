import styled from 'styled-components';
import BorderLayout from '../components/BorderLayout';
import CategoryCard from '../components/CategoryCard';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Toast from '../components/Toast';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const SubscribePage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const [subscribeArr, setSubscribeArr] = useState([]);
  const arr = [
    { categoryName: 'React', questionCategoryId: 2 },
    { categoryName: 'Javascript', questionCategoryId: 8 },
    { categoryName: 'Java', questionCategoryId: 1 },
    { categoryName: 'Spring', questionCategoryId: 3 },
    { categoryName: 'Data Structure', questionCategoryId: 4 },
    { categoryName: 'OS', questionCategoryId: 5 },
    { categoryName: 'Database', questionCategoryId: 6 },
    { categoryName: 'Network', questionCategoryId: 7 },
  ];

  const handleSubscribe = async (id, categoryName, isSubscribe) => {
    if (isSubscribe) {
      // 구독해제상황
      await axiosInstance.post('/member/subscription', {
        questionCategoryId: id,
      });
      toast.success(`${categoryName} 구독을 해제합니다!`);
      const origin = subscribeArr;
      setSubscribeArr(origin.filter((el) => el !== id));
    } else {
      if (categoryName === 'Spring') {
        await axiosInstance.post('/member/subscription', {
          questionCategoryId: id,
        });
        toast.success(`${categoryName}을 구독합니다!`);
        const origin = subscribeArr;
        origin.push(id);
        setSubscribeArr([...origin]);
      } else {
        await axiosInstance.post('/member/subscription', {
          questionCategoryId: id,
        });

        toast.success(`${categoryName}를 구독합니다!`);
        const origin = subscribeArr;
        origin.push(id);
        setSubscribeArr([...origin]);
      }
    }
  };

  useEffect(() => {
    axiosInstance.get('/subscription').then((res) => {
      setSubscribeArr(
        res.data.subscriptions.map((el) => el.questionCategoryId)
      );
    });
  }, []);
  return (
    <BorderLayout>
      <Message themeState={themeState}>
        <section>
          <div>주제를 클릭하여 구독해주세요</div>
          <div>매일 아침 7시 이메일로 </div>
          <div>구독중인 모든 주제의 면접 질문이 전달됩니다</div>
        </section>
      </Message>
      <Toast />
      <GridLayout>
        {arr.map((el, idx) => (
          <CategoryCard
            key={el.questionCategoryId}
            categoryName={el.categoryName}
            questionCategoryId={el.questionCategoryId}
            handleClick={handleSubscribe}
            isSubscribe={subscribeArr.includes(el.questionCategoryId)}
          />
        ))}
      </GridLayout>
    </BorderLayout>
  );
};

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-row-gap: 20%;
  height: auto;
  place-items: center;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 50%);
    grid-row-gap: 10%;
    padding-bottom: 20%;
  }
  @media screen and (max-width: 413px) {
    grid-template-columns: repeat(1, 100%);
    grid-row-gap: 2.5%;
    padding-bottom: 40%;
  }
`;
const Message = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1vw;
  margin-bottom: 3%;
  justify-content: center;
  color: ${(props) => (props.themeState === 'light') === 'var(--color-black)'};
  div {
    justify-content: start;
    margin-bottom: 2%;
  }
`;

export default SubscribePage;
