import axios, {AxiosResponse} from "axios";
import {API_URL} from "../constants";

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

export async function getUserMe(token: string): Promise<AxiosResponse> {
    try {
        return await api.get("user/me", {
            headers: {
                token
            }
        })
    } catch (error) {
        if (axios.isAxiosError(error))
            throw error;
        throw new Error("Something went wrong");
    }
}
