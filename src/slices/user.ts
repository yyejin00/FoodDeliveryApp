import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  //이 안에 있는 애들 컴포넌트 전체에서 다같이 공유할수있는 전역상태임
  name: '',
  email: '',
  accessToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
