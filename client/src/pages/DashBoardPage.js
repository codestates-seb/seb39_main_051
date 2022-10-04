import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import BasicButton from '../components/BasicButton';
import BorderLayout from '../components/BorderLayout';
import CategoryCardMobile from '../components/CategoryCardMobile';
import DashBoard from '../components/DashBoard';
import axiosInstance from '../utils/axiosInstance';

const DashBoardPage = () => {
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
    <>
      <BorderLayout>
        <Layout>
          <LeftContent themeState={themeState}>
            <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
            <a href='/mypage' className='web'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='대쉬보드'
                selected
              />
            </a>
            <SubscribeWrapper themeState={themeState}>
              {category.map((el) => (
                <CategoryCardMobile
                  key={el.questionCategoryId}
                  categoryName={el.categoryName}
                  questionCategoryId={el.questionCategoryId}
                  handleClick={handleSubscribe}
                  isSubscribe={subscribeArr.includes(el.questionCategoryId)}
                />
              ))}
            </SubscribeWrapper>
            <a href='/userimg'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='프로필 사진 변경'
              />
            </a>
            <a href='/username'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='닉네임 변경'
              />
            </a>
            <a href='/userpassword'>
              <BasicButton
                themeState={themeState}
                width='100%'
                height='4rem'
                color='var(--color-white)'
                backGroundColor='var(--color-orange)'
                fontSize='1.8rem'
                text='비밀번호 변경'
              />
            </a>
          </LeftContent>
          <RightContent themeState={themeState}>
            <DashBoard
              handleSubscribe={handleSubscribe}
              subscribeArr={subscribeArr}
              category={category}
            />
          </RightContent>
        </Layout>
      </BorderLayout>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  min-width: 25rem;
  margin-right: 5rem;

  a {
    width: 80%;
    height: 4rem;
    margin: 2rem 0;
  }

  @media screen and (max-width: 1025px) {
    width: 100%;
    margin: 0;

    a {
      width: 100%;
      height: 4rem;
      margin: 2rem 0;
    }

    .web {
      display: none;
    }
  }
`;

const UserProfileImage = styled.img`
  display: block;
  width: 25rem;
  height: 25rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1rem solid
    ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-orange)'
        : 'var(--color-gray)'};
  border-radius: 1.5rem;
  padding: 5rem;

  @media screen and (max-width: 1025px) {
    display: none;
  }
`;

const SubscribeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 1rem;
  place-items: center;
  width: 100%;
  height: fit-content;
  background-color: ${(props) =>
    props.themeState === 'light'
      ? 'var(--color-white)'
      : 'var(--color-dark-bg-color)'};
  border: 0.7rem solid
    ${(props) =>
      props.themeState === 'light'
        ? 'var(--color-orange)'
        : 'var(--color-gray)'};
  border-radius: 1rem;
  padding: 1rem 0;

  @media screen and (min-width: 1026px) {
    display: none;
  }
`;

export default DashBoardPage;
