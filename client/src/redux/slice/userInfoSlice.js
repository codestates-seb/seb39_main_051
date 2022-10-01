import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../../utils/cookie'
const isTokenAlive = getCookie('accessToken')
const getNickName = getCookie('nickname')
const getuUerId = getCookie('memberId')

let initialState = {
    isLoggedIn : isTokenAlive,
    userId  : getuUerId,
    nickName : getNickName
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers : {
    }
})

export const {} = userInfoSlice.actions
export default userInfoSlice.reducer