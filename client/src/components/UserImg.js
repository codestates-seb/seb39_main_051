import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';

const UserImg = ({ handleImgInput, handleOnClick }) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const {userPicture} = useSelector((state)=>state.userInfoSlice)
  return (
    <>
      <Title>프로필 사진 변경</Title>
      <ContentWrapper>
        <UserProfileImage src={userPicture}/>
        <div>
          <span>사진을 드래그해주세요.</span>
          <InputImgWrapper themeState={themeState}>
            <InputImg type='file' accept='image/*' onChange={handleImgInput} />
          </InputImgWrapper>
          <BasicButton
            themeState={themeState}
            width='20%'
            height='4rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.3rem'
            text='변경하기'
            onClick={handleOnClick}
          />
        </div>
      </ContentWrapper>
    </>
  );
};

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 60rem;

  & div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: flex-end;

    & span {
      position: relative;
      top: 45%;
      right: 45%;
      color: var(--color-white);
    }
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
