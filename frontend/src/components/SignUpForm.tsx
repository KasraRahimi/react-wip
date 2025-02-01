const onLoginSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log(e);
};

function SignUpForm() {
  return (
    <>
      <form className="p-4 border border-2 rounded" onSubmit={onLoginSubmit}>
        <h2 className="text-center">Sign Up</h2>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <button type="submit" className="btn btn-outline-primary w-100">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
