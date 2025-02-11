import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserMe } from "../../routes/authentication";
import { AxiosResponse, HttpStatusCode } from "axios";

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

const getInitialState = async () => {
    const token = localStorage.getItem("token")
    if (!token) return {}

    let response = await getUserMe(token);
    if (response.status == HttpStatusCode.Ok) {
        response = response as AxiosResponse
        const user = {
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
        }
        return {
            token,
            user
        }
    }
    return {}
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
        clearUser: (state, shouldClearLocalStorage: PayloadAction<boolean>) => {
            state = {}
            if (shouldClearLocalStorage.payload) localStorage.removeItem("token");
        }
    }
});

export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
