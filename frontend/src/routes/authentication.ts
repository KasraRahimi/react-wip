import axios from "axios";
import { API_URL } from "../constants";

const api = axios.create({
    baseURL: API_URL
})

export async function postSignUpInfo(email: string, username: string, password: string): Promise<string | null> {
    try {
        const response = await api.post('auth/signup', 
            {
                email,
                username,
                password
            }
        )
        return response.data;
    } catch (error) {
        console.log(error)
        return null
    }
}