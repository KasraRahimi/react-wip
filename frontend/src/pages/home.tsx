import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function Home() {
    const [isLogin, setIsLogin] = useState(true);
    let btnMessage = isLogin ? "Don't have an account?" : "Have an account?";

    const getForm = (isLoggingIn: boolean) => isLoggingIn ? <LoginForm /> : <SignUpForm />

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                {getForm(isLogin)}
                <button 
                    onClick={(_) => setIsLogin(!isLogin)} 
                    className="btn btn-primary my-3">
                    {btnMessage}
                </button>
            </div>
        </>
    );
}

export default Home;