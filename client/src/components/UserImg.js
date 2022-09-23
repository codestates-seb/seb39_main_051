import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';

const UserImg = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  return (
    <>
      <Title>프로필 사진 변경</Title>
      <ContentWrapper>
        <UserProfileImage src='https://lh3.googleusercontent.com/a-/AFdZucpIQ6i4DewU4N2dncFukPbb0eF3gkIB9xOsdEFNCw=k-s256' />
        <div>
          <BasicButton
            themeState={themeState}
            width='30%'
            height='4rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.8rem'
            text='변경하기'
          />
        </div>
      </ContentWrapper>
    </>
  );
};

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  & div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: flex-end;
  }
`;

const UserProfileImage = styled.img`
  width: 35%;
  height: 40%;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
`;

export default UserImg;
