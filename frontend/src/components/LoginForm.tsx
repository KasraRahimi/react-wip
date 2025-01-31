
const onLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e)
}

function LoginForm() {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <form className="p-4 border rounded shadow bg-white" onSubmit={onLoginSubmit}>
                    <h2 className="text-center">Sign In</h2>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="username" placeholder="Enter username" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" id="password" className="form-control" placeholder="Enter password" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-outline-primary w-100">Log In</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginForm;
