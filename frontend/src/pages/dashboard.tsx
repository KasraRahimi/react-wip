import { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

function Dashboard() {
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();

    if (!user) {
        useEffect(() => {
            navigate("/");
        }, [navigate])
    }

    return (
        <>
            <Navbar />
            <h1>Hello, {user?.username}</h1>
        </>
    );
}

export default Dashboard;