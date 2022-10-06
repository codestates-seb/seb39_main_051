import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie } from '../../utils/cookie';

const isTokenAlive = getCookie('accessToken');
const getNickName = getCookie('nickname');
const getUserId = getCookie('memberId');
const getUserRole = getCookie('role');
const getUserPicture = getCookie('picture');

let initialState = {
  isLoggedIn: isTokenAlive,
  userId: getUserId,
  nickName: getNickName,
  role: getUserRole,
  userPicture : getUserPicture,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('nickname');
      deleteCookie('memberId');
      deleteCookie('role');
      deleteCookie('picture')
      alert('로그아웃 되셨습니다.');
      state.isLoggedIn = false;
      state.userId = null;
      state.nickName=null;
      state.role=null;
      action.payload.home('/')
    }

  },
});

export const {handleLogout} = userInfoSlice.actions;
export default userInfoSlice.reducer;
