import { createSlice } from '@reduxjs/toolkit'

// const initialState = { value: 0 }

const userSlice = createSlice({
  name: 'user',
  initialState: {
    displayName: "",
    uid: "",
    accessToken: "", // user가 로그인 했는지 안했는지 여부 추적
    photoURL: "",
    isLoading: false,
  },
  reducers: {
    loginUser: (state,action) => {
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
      state.photoURL = action.payload.photoURL;
      state.isLoading = true;
    },
    clearUser: (state) => {
      state.displayName = "";
      state.uid = "";
      state.accessToken = "";
      state.photoURL = "";
      state.isLoading = true;
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;