import LogoutBtn from "./buttons/LogoutBtn"

interface NavItem {
    title: string,
    link: string,
}

function Navbar() {
    const textColor = "text-light"

    const navItems: NavItem[] = [
        {
            title: "Home",
            link: "/dashboard"
        },
        {
            title: "Profile",
            link: "/user/me",
        },
        {
            title: "Search",
            link: "/search"
        }
    ]

    const listOfNavItems = navItems.map((navItem) => {
        return (
            <li className="nav-item">
                <a className={`nav-link ${textColor}`} href={navItem.link}>
                    {navItem.title}
                </a>
            </li>
        )
    })

    return (
        <>
            <nav className="navbar bg-success navbar-expand-lg">
                <div className="container-fluid">
                    <a className={`navbar-brand ${textColor}`}>Kawa's Site</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {listOfNavItems}
                        </ul>
                        <div className="ms-auto">
                            <LogoutBtn className="btn btn-outline-danger" />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;