import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserMe } from "../../routes/authentication";
import axios, { HttpStatusCode } from "axios";

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

const getInitialState = async (): Promise<UserState> => {
    const token = localStorage.getItem("token")
    if (!token) return {}

    try {
        const response = await getUserMe(token);
        if (response.status !== HttpStatusCode.Ok) {
            return {}
        }
        const user = {
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
        };
        return {
            token,
            user
        };
    } catch (error) {
        if (!axios.isAxiosError(error))
            console.error(error);
        return {};
    }
}

const initialState: UserState = await getInitialState()

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
        clearUser: (_, shouldClearLocalStorage: PayloadAction<boolean>) => {
            if (shouldClearLocalStorage.payload) localStorage.removeItem("token");
            return {};
        }
    }
});

export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
