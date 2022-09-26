import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Post from './pages/Post';
import PostPage from './pages/PostPage';
import AnswerPage from './pages/AnswerPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SubscribePage from './pages/SubscribePage';
import AnswerBoardPage from './pages/AnswerBoardPage';
import FreeBoardPage from './pages/FreeBoardPage';
import SuggestionBoardPage from './pages/SuggestionBoardPage';
import DashBoardPage from './pages/DashBoardPage';
import UserImgPage from './pages/UserImgPage';
import UserNamePage from './pages/UserNamePage';
import UserPasswordPage from './pages/UserPasswordPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/post' element={<PostPage />} />
      <Route path='/mypage' element={<DashBoardPage />} />
      <Route path='/answer:id' element={<AnswerPage />} />
      <Route path='/board:id' element={<Post />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/subscribe' element={<SubscribePage />} />
      <Route path='/answer' element={<AnswerBoardPage />} />
      <Route path='/free' element={<FreeBoardPage />} />
      <Route path='/suggestion' element={<SuggestionBoardPage />} />
      <Route path='/userimg' element={<UserImgPage />} />
      <Route path='/username' element={<UserNamePage />} />
      <Route path='/userpassword' element={<UserPasswordPage />} />
    </Routes>
  );
};

export default Router;
