import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router";
import LogoutBtn from "../components/buttons/LogoutBtn";
import Navbar from "../components/Navbar";

function Dashboard() {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
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
            <LogoutBtn/>
        </>
    );
}

export default Dashboard;