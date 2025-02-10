import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../constants";

const api = axios.create({
    baseURL: API_URL,
});

export async function postSignUpInfo(
    email: string,
    username: string,
    password: string
): Promise<string | null> {
    try {
        const response = await api.post("auth/signup", {
            email,
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function postLogInInfo(
    username: string,
    password: string
): Promise<AxiosResponse | null> {
    try {
        const response = await api.post("auth/login", {
            username,
            password,
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserMe(token: string): Promise<AxiosResponse | AxiosError> {
    try {
        const response = await api.get("user/me", {
            headers: {
                token
            }
        })
        return response
    } catch (error) {
        return error as AxiosError
    }
}
