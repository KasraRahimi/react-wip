
function LoginForm() {
    return (
        <>
            <form>
                <h2>Sign In</h2>
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Enter username" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" />
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </>
    );
}

export default LoginForm;
