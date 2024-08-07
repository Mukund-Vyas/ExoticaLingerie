import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileOpen: false,
    },
    reducers: {
        setProfileOpen: (state, action) => {
            state.profileOpen = action.payload.isOpen;
        },
    },
});

export const { setProfileOpen } = profileSlice.actions;

export default profileSlice.reducer;
