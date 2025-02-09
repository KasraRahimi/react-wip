import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string,
    email: string,
    username: string,
    passwordHash?: string,
}

interface UserState {
    token?: string,
    user?: User,
}

const initialState: UserState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, user: PayloadAction<User>) => {
            state.user = user.payload
        },
        setToken: (state, token: PayloadAction<string>) => {
            state.token = token.payload
        },
        clearUser: (state) => {
            state = {}
        }
    }
});

export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
