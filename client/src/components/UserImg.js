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
          <InputImgWrapper themeState={themeState}>
            <span>사진을 드래그해주세요.</span>
            <InputImg type='file' accept='image/*' />
          </InputImgWrapper>
          <BasicButton
            themeState={themeState}
            width='20%'
            height='4rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.3rem'
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
  margin-bottom: 5%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 25rem;
  height: 30rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
`;

const InputImgWrapper = styled.div`
  width: 100%;
  height: 70%;
  background-color: ${(props) =>
    props.themeState === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  color: var(--color-white);
  border-radius: 1.5rem;
  margin-bottom: 2%;

  & span {
    position: relative;
    top: 50%;
    right: 45%;
  }
`;

const InputImg = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 1.5rem;
  opacity: 0;
  cursor: pointer;
`;

export default UserImg;
