import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import PostPage from './pages/PostPage';
import QuestionPage from './pages/QuestionPage';
import LoginPage from './pages/signInUp/LoginPage';
import SignUpPage from './pages/signInUp/SignUpPage';
import SubscribePage from './pages/SubscribePage';
import QuestionBoardPage from './pages/QuestionBoardPage';
import FreeBoardPage from './pages/FreeBoardPage';
import SuggestionBoardPage from './pages/SuggestionBoardPage';
import DashBoardPage from './pages/mypage/DashBoardPage';
import UserImgPage from './pages/mypage/UserImgPage';
import UserNamePage from './pages/mypage/UserNamePage';
import UserPasswordPage from './pages/mypage/UserPasswordPage';
import AnswerPostPage from './pages/AnswerPostPage'
import EditBoardPage from './pages/EditBoardPage';
import EditQuestionPage from './pages/EditQuestionPage';
import { useSelector } from 'react-redux';
const Router = () => {
  const {isLoggedIn} = useSelector((state)=>state.userInfoSlice)
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/question/:id' element={<QuestionPage />} />
      <Route path='/board/:id' element={<PostDetailPage />} />
      <Route path='/questions' element={<QuestionBoardPage />} />
      <Route path='/questions/:category' element={<QuestionBoardPage />} />
      <Route path='/free' element={<FreeBoardPage />} />
      <Route path='/free/:category' element={<FreeBoardPage />} />
      <Route path='/suggestion' element={<SuggestionBoardPage />} />
      <Route path='/suggestion/:category' element={<SuggestionBoardPage />} />
      {isLoggedIn ? (
        <>
        <Route path='/post' element={<PostPage />} />
      <Route path='/mypage' element={<DashBoardPage />} />
      <Route path='/subscribe' element={<SubscribePage />} />
      <Route path='/userimg' element={<UserImgPage />} />
      <Route path='/username' element={<UserNamePage />} />
      <Route path='/userpassword' element={<UserPasswordPage />} />
      <Route path='/answer/post' element={<AnswerPostPage />} />
      <Route path='/edit/board' element={<EditBoardPage />} /> 
      <Route path='/edit/question' element={<EditQuestionPage/>} />
        </>
        ) : (
        <>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        </>
        )}
        <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};

export default Router;
