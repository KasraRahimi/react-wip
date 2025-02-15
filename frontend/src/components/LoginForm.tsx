import { useState } from "react";
import { postLogInInfo } from "../routes/authentication";
import axios, {AxiosResponse, HttpStatusCode} from "axios";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/store";
import { setToken, setUser } from "../redux/slices/userSlice";

enum LoginError {
    None = "None",
    InvalidLogin = "InvalidLogin",
    InvalidData = "InvalidData",
    ServerError = "ServerError",
    ClientError = "ClientError",
}

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState<LoginError>(LoginError.None);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginError(LoginError.None);
        let res: AxiosResponse;
        try {
            res = await postLogInInfo(username, password);
        } catch (err) {
            if (!axios.isAxiosError(err)) {
                setLoginError(LoginError.ClientError);
                return;
            }

            switch (err.response?.status) {
                case HttpStatusCode.Unauthorized:
                    setLoginError(LoginError.InvalidLogin);
                    break;
                case HttpStatusCode.InternalServerError:
                    setLoginError(LoginError.ServerError);
                    break;
                case HttpStatusCode.BadRequest:
                    setLoginError(LoginError.InvalidData);
                    break;
                default:
                    setLoginError(LoginError.ServerError);
                    break;
            }
            setIsLoading(false);
            return;
        }
        console.log(res)
        if (res.status == HttpStatusCode.Ok) {
            dispatch(setUser(res.data.user));
            dispatch(setToken(res.data.token));
            localStorage.setItem("token", res.data.token)
            navigate("/dashboard")
        }
        setIsLoading(false);
        setLoginError(LoginError.None);
    };

    const isDisabled = !username || !password;

    const getErrorMessage = () => {
        let text: string;
        console.log(loginError);
        switch (loginError) {
            case LoginError.None:
                return null
            case LoginError.ServerError:
            case LoginError.ClientError:
                text = "Something went wrong. Please try again.";
                break;
            case LoginError.InvalidLogin:
                text = "Incorrect username and/or password";
                break;
            case LoginError.InvalidData:
                text = "The input data was invalid.";
                break;
        }
        return <p className="invalid-feedback d-block">{text}</p>
    }

    return (
        <>
            <form
                className="p-4 border border-2 rounded"
                onSubmit={onLoginSubmit}
            >
                <h2 className="text-center">Sign In</h2>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div>
                    <button
                        type="submit"
                        className={`btn btn-outline-${
                            isDisabled ? "secondary" : "primary"
                        } w-100`}
                        disabled={isDisabled}
                    >
                        Log In
                    </button>
                </div>
                {isLoading && (
                    <div className="d-flex justify-content-center align-items-center m-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                {getErrorMessage()}
            </form>
        </>
    );
}

export default LoginForm;
