import { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { PathConstant } from '../constants/path.constant';
import { SettingConstant } from '../constants/setting.constant';
import User from '../models/user.model';
import { ContainerState } from '../types/auth.type';

const USER_COOKIE_NAME = SettingConstant.USER_COOKIE_NAME;
const ACCESS_TOKEN_COOKIE_NAME = SettingConstant.ACCESS_TOKEN_COOKIE_NAME;
const REFRESH_TOKEN_COOKIE_NAME = SettingConstant.REFRESH_TOKEN_COOKIE_NAME;

const cookies = new Cookies();

export const initialState: ContainerState = {
  user: cookies.get(USER_COOKIE_NAME) || null,
  accessToken: cookies.get(ACCESS_TOKEN_COOKIE_NAME) || null,
  refreshToken: cookies.get(REFRESH_TOKEN_COOKIE_NAME) || null,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<User>) {
      state.user = action.payload;
      cookies.set(USER_COOKIE_NAME, action.payload, {
        path: PathConstant.ROOT,
      });
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      cookies.set(ACCESS_TOKEN_COOKIE_NAME, action.payload, {
        path: PathConstant.ROOT,
      });
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
      cookies.set(REFRESH_TOKEN_COOKIE_NAME, action.payload, {
        path: PathConstant.ROOT,
      });
    },
    setLoggedOut(state) {
      cookies.remove(USER_COOKIE_NAME, {
        path: PathConstant.ROOT,
      });
      cookies.remove(ACCESS_TOKEN_COOKIE_NAME, {
        path: PathConstant.ROOT,
      });
      cookies.remove(REFRESH_TOKEN_COOKIE_NAME, {
        path: PathConstant.ROOT,
      });
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    resetState(state) {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
    },
  },
});

export const { actions, reducer, name: sliceKey } = authSlice;
