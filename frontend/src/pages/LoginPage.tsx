import {useAppSelector} from "../redux/store.ts";
import {Navigate} from "react-router";
import LoginForm from "../components/LoginForm.tsx";

function LoginPage() {
    const user = useAppSelector((state) => state.user.user);

    if (user) {
        return <Navigate to="/dashboard" replace/>;
    }

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                <LoginForm />
                <a href="/signup" className="btn btn-primary my-3">Don't have an account?</a>
            </div>
        </>
    )
}

export default LoginPage;