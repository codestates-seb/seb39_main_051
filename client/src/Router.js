import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import Post from './pages/Post';
import PostPage from './pages/PostPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/post' element={<PostPage />} />
      <Route path='/board' element={<Post />} />
      <Route path='/mypage' element={<MyPage />} />
    </Routes>
  );
};

export default Router;
