import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import Post from './pages/Post';
import PostPage from './pages/PostPage';
import AnswerPage from './pages/AnswerPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SubscribePage from './pages/SubscribePage';


const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/post' element={<PostPage />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/answer' element={<AnswerPage />} />
      <Route path='/board' element={<Post />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/subscribe' element={<SubscribePage/>} />
    </Routes>
  );
};

export default Router;
