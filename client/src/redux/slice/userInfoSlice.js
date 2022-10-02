import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';

const isTokenAlive = getCookie('accessToken');
const getNickName = getCookie('nickname');
const getUserId = getCookie('memberId');
const getUserRole = getCookie('role');

let initialState = {
  isLoggedIn: isTokenAlive,
  userId: getUserId,
  nickName: getNickName,
  role: getUserRole,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
});

export const {} = userInfoSlice.actions;
export default userInfoSlice.reducer;
