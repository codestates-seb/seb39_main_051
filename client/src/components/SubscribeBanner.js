import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SubscribeBanner = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const navigate = useNavigate();
  const handleGoToSubscribe = () => {
    navigate('/subscribe');
  };
  return (
    <SubscribeBtn
      onClick={() => handleGoToSubscribe()}
      themeState={themeState}
    >
      면접질문 구독하러 가기
    </SubscribeBtn>
  );
};

const SubscribeBtn = styled.div`
  bottom:10%;
  left:50%;
  transform: translate(-50%, 0);
  font-size: 2rem;
  font-weight: bold;
  border-radius: 1.5rem;
  text-align: center;
  padding: 1%;
  position: fixed;
  background: ${(props) =>
    props.themeState === 'light' ? '#FEDD89' : 'var(--color-gray)'};
  color: white;
  cursor: pointer;

`;

export default SubscribeBanner;
