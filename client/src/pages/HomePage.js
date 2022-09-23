import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import TapMenu from '../components/TapMenu';
import CategoryCard from '../components/CategoryCard';
import PostCard from '../components/PostSummary';
import Form from '../components/Form';
import AnswerCard from '../components/AnswerCard';
import SubscribeBanner from '../components/SubscribeBanner';
import BorderLayout from '../components/BorderLayout';

const HomePage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  return (
    <BorderLayout>
      {/* <div>
        학교수업 듣고 부트캠프, 프로젝트 이직 준비하는 회사원 매일 아침 면접
        질문과 최신 IT동향을 이메일로 받아보세요! [ 구독서비스 바로가기 ] 자신의
        생각을 모범 답안과 동료들의 답변을 참고하여 자신만의 스토리를
        만들어보세요! [모범답안게시판 바로가기] 함께 공부할 동료가 필요하다면
        파티원 모집을 통해 자신이 원하는 스터디 혹은, 프로젝트에 참여해보세요!
        [스터디 모집 서비스 바로가기]
      </div> */}
      <SubscribeBanner />
    </BorderLayout>
  );
};

export default HomePage;
