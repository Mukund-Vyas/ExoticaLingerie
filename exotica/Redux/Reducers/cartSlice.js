import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartOpen: false,
    },
    reducers: {
        setCartOpen: (state, action) => {
            state.cartOpen = action.payload.isOpen;
        },
    },
});

export const { setCartOpen } = cartSlice.actions;

export default cartSlice.reducer;
