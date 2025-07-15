import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  //così salvo anche i dati utente
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload || null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    }
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;