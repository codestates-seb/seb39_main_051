import styled from 'styled-components';
import BorderLayout from '../components/BorderLayout';
import CategoryCard from '../components/CategoryCard';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Toast from '../components/Toast';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SubscribePage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const { isLoggedIn, userId, nickName } = useSelector((state) => state.userInfoSlice);
  const [subscribeArr, setSubscribeArr] = useState([1,2,3,4,5,6,7,8]);
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

  const handleSubscribe = (id, categoryName, isSubscribe) => {
    if(isSubscribe){
      //구독해제상황
      // await axios.post('/member/subscription',{
      //   questionCategoryId:id
      // })
      toast.success(`${categoryName} 구독을 해제합니다!`)
      const origin = subscribeArr
      setSubscribeArr(origin.filter((el)=>el !== id))
    }
    else{
      if(categoryName==='Spring'){
        // await axios.post('/member/subscription',{
        //   questionCategoryId:id
        // })
        toast.success(`${categoryName}을 구독합니다!`)
        const origin = subscribeArr
        origin.push(id)
        setSubscribeArr([...origin])
      }else{
        // await axios.post('/member/subscription',{
        //   questionCategoryId:id
        // })
        toast.success(`${categoryName}를 구독합니다!`)
        const origin = subscribeArr
        origin.push(id)
        setSubscribeArr([...origin])
      }
    }
  }

  // useEffect(()=>{
  //   axios.get('/subscription')
  //   .then((res)=>console.log(res))
  // })
  return (
    <BorderLayout>
      <Message themeState={themeState}>
        매일 받고 싶은 면접 주제를 선택하세요!
      </Message>
      <Toast />
      <GridLayout>
        {arr.map((el,idx) => (
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
  text-align: center;
  font-weight: bold;
  font-size: 1vw;
  margin-bottom: 3%;
  color: ${(props) => (props.themeState === 'light') === 'var(--color-black)'};
`;

export default SubscribePage;
