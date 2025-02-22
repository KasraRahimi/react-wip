import axios, {AxiosResponse} from "axios";
import {API_URL} from "../constants";

const api = axios.create({
    baseURL: API_URL,
});

export async function postSignUpInfo(
    email: string,
    username: string,
    password: string
): Promise<AxiosResponse> {
    try {
        return api.post("auth/signup", {
            email,
            username,
            password
        });
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw err;
        }
        throw new Error("Something went wrong");
    }
}

export async function postLogInInfo(
    username: string,
    password: string
): Promise<AxiosResponse> {
    try {
        return await api.post("auth/login", {
            username,
            password,
        });
    } catch (error) {
        if (axios.isAxiosError(error))
            throw error;
        throw new Error("Something went wrong");
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
