import { useState } from "react";
import { postLogInInfo } from "../routes/authentication";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/store";
import { setToken, setUser } from "../redux/slices/userSlice";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await postLogInInfo(username, password);
        console.log(res)
        if (res?.status == HttpStatusCode.Ok) {
            dispatch(setUser(res.data.user));
            dispatch(setToken(res.data.token));
            navigate("/dashboard")
        }
    };

    const isDisabled = !username || !password;

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
            </form>
        </>
    );
}

export default LoginForm;
