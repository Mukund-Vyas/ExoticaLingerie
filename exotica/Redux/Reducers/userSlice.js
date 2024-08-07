// slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async (identifier) => {
    const response = await fetch(process.env.NEXT_PUBLIC_FATCH_LOGIN_USER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(identifier),
    });
    const data = await response.json();
    return data;
});

// // initialize userToken from local storage
// const getInitialAuthToken = () => {
//     if (typeof window !== 'undefined' && localStorage.getItem('userToken')) {
//         return localStorage.getItem('userToken');
//     }
//     return null;
// }

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        isUser: false,
        authToken: null,
    },
    reducers: {
        logout: (state, action) => {
            const emptyState = {
                isLoading: false,
                isUser: false,
                authToken: null,
            }
            localStorage.removeItem('authToken');
            return emptyState;
        },
        setAuthToken: (state, action) => {
            const emptyState = {
                isLoading: false,
                isUser: true,
                authToken: action.payload.accessToken,
            }
            localStorage.setItem('authToken', action.payload.accessToken);
            return emptyState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.accessToken) {
                state.isUser = true;
                state.authToken = action.payload.accessToken;
                localStorage.setItem('authToken', action.payload.accessToken);
            } else {
                state.isUser = false;
            }
        });
        builder.addCase(fetchUser.rejected, (state) => {
            state.isLoading = false;
            state.isUser = false;
        });
    },
});

export const {
    logout,
    setAuthToken
} = userSlice.actions;

export default userSlice.reducer;
