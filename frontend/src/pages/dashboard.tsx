import { useEffect } from "react";
import { clearUser } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router";

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
            <h1>Hello, {user?.username}</h1>
            <button className="btn" onClick={() => dispatch(clearUser())} />
        </>
    );
}

export default Dashboard;