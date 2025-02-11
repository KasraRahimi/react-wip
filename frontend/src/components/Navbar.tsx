
function Navbar() {
    const textColor = "text-light"

    return (
        <>
            <nav className="navbar bg-green-500 navbar-expand-lg">
                <div className="container-fluid">
                    <a className={`navbar-brand ${textColor}`}>Kawa's Site</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className={`nav-link ${textColor} active`} href="/dashboard">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${textColor}`} href="/user/me">Profile</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;