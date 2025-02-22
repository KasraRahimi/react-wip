import { useState } from "react";
import { postSignUpInfo } from "../routes/authentication";
import axios from "axios";

function SignUpForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response;
        try {
            response = await postSignUpInfo(email, username, password);
            console.log(response.data);
        } catch (err) {
            if (!axios.isAxiosError(err)) return;
            switch (err.status) {
                default:
                    console.log(`Received Status Code: ${err.status}`);
                    console.log(err.response);
            }
        }
    };

    const isDisabled = !email || !username || !password;

    return (
        <>
            <form
                className="p-4 border border-2 rounded"
                onSubmit={onLoginSubmit}
            >
                <h2 className="text-center">Sign Up</h2>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div>
                    <button
                        type="submit"
                        className={`btn btn-outline-${isDisabled ? 'secondary' : 'primary'} w-100`}
                        disabled={isDisabled}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </>
    );
}

export default SignUpForm;
