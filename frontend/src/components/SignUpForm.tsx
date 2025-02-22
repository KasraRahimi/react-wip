import { useState } from "react";
import { postSignUpInfo } from "../routes/authentication";
import { validate as emailValidator } from "email-validator";
import axios from "axios";

enum FormError {
    // FRONTEND CHECKS
    InvalidEmail = "invalidEmail",
    NoEmail = "noEmail",
    InvalidUsername = "invalidUsername",
    NoUsername = "noUsername",
    InvalidPassword = "invalidPassword",
    ShortPassword = "shortPassword",

    // BACKEND CHECKS
    EmailInUse = "emailInUse",
    UsernameInUse = "usernameInUse"
}

const MINIMAL_PASSWORD_LENGTH = 8;

const validateForm = (email: string, username: string, password: string): FormError[] => {
    const formErrors = [];

    if (!email || email === "") formErrors.push(FormError.NoEmail);
    else if (!emailValidator(email)) formErrors.push(FormError.InvalidEmail);

    if (!username || username == "") formErrors.push(FormError.NoUsername);

    if (password.length < MINIMAL_PASSWORD_LENGTH) formErrors.push(FormError.ShortPassword);

    return formErrors;
}

function SignUpForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [formErrors, setFormErrors] = useState<FormError[]>([]);

    const onLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formErrors.length !== 0) {
            console.log(formErrors);
            return;
        }
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

    const isDisabled = formErrors.length > 0;

    const getEmailElement = () => {
        let errorText: string | undefined = undefined;
        if (formErrors.includes(FormError.NoEmail)) errorText = "Email is required";
        else if (formErrors.includes(FormError.InvalidEmail)) errorText = "Email address is invalid";

        const validity = errorText ? "is-invalid" : "is-valid";
        return (
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className={`form-control ${validity}`}
                    id="email"
                    placeholder="Enter email"
                    onChange={e => {
                            const newEmail = e.target.value;
                            setEmail(newEmail);
                            setFormErrors(validateForm(newEmail, username, password));
                    }}
                />
                <label htmlFor="email">Email</label>
                <div className="invalid-feedback">{errorText}</div>
            </div>
        )
    }

    const getUsernameElement = () => {
        let errorText: string | undefined = undefined;
        if (formErrors.includes(FormError.NoUsername)) errorText = "Username is required";
        else if (formErrors.includes(FormError.InvalidUsername)) errorText = "Username is invalid";

        const validity = errorText ? "is-invalid" : "is-valid";

        return (
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className={`form-control ${validity}`}
                    id="username"
                    placeholder="Enter username"
                    onChange={e => {
                        const newUsername = e.target.value;
                        setUsername(newUsername);
                        setFormErrors(validateForm(email, newUsername, password));
                    }}
                />
                <label htmlFor="username">Username</label>
                <div className="invalid-feedback">{errorText}</div>
            </div>
        )
    }

    const getPasswordElement = () => {
        let errorText: string | undefined = undefined;
        if (formErrors.includes(FormError.ShortPassword)) errorText = "Password must be at least 8 characters";

        const validity = errorText ? "is-invalid" : "is-valid";
        return (
            <div className="form-floating mb-3">
                <input
                    type="password"
                    id="password"
                    className={`form-control ${validity}`}
                    placeholder="Enter password"
                    onChange={e => {
                        const newPassword = e.target.value;
                        setPassword(newPassword);
                        setFormErrors(validateForm(email, username, newPassword));
                    }}
                />
                <label htmlFor="password">Password</label>
                <div className="invalid-feedback">{errorText}</div>
            </div>
        )
    }

    return (
        <>
            <form
                className="p-4 border border-2 rounded"
                onSubmit={onLoginSubmit}
            >
                <h2 className="text-center">Sign Up</h2>
                {getEmailElement()}
                {getUsernameElement()}
                {getPasswordElement()}
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
