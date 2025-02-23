import {useAppSelector} from "../redux/store.ts";
import {Navigate} from "react-router";
import SignUpForm from "../components/SignUpForm.tsx";

function SignUpPage() {
    const user = useAppSelector((state) => state.user.user);

    if (user) {
        return <Navigate to="/dashboard" replace/>;
    }
    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                <SignUpForm />
                <a href="/login" className="btn btn-primary my-3">Already have an account?</a>
            </div>
        </>
    );
}

export default SignUpPage;
