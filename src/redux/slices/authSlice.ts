import { AuthState } from "@/types/otherTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: AuthState = {
  name: null,
  email: null,
  userType: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { name, email, userType, token } }: PayloadAction<AuthState>
    ) => {
      state.name = name;
      state.email = email;
      state.userType = userType;
      state.token = token;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.userType = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
