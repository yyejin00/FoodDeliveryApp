import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, UseDispatch} from 'react-redux';
import rootReducer from './reducer'; //reducer 생성해야됨

const store = configureStore({
  reducer: rootReducer,
});
export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
