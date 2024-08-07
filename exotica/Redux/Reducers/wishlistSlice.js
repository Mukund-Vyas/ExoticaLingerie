import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'profile',
    initialState: {
        wishlists: [],
    },
    reducers: {
        setWishlists: (state, action) => {
            state.wishlists = action.payload;
        },
    },
});

export const { setWishlists } = wishlistSlice.actions;

export default wishlistSlice.reducer;
