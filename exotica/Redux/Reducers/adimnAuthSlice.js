// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  admin: null, // or your desired initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.admin = action.payload; // Set admin info from payload
      localStorage.setItem('adminToken', action.payload.token); // Store token in localStorage
    },
    logout(state) {
      state.isAuthenticated = false;
      state.admin = null; // Reset admin state
      localStorage.removeItem('adminToken'); // Remove token from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
