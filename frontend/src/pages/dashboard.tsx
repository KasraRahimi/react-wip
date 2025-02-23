import { useAppSelector } from "../redux/store";
import {Navigate} from "react-router";
import Navbar from "../components/Navbar";

function Dashboard() {
    const user = useAppSelector((state) => state.user.user);

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <>
            <Navbar />
            <h1>Hello, {user?.username}</h1>
        </>
    );
}

export default Dashboard;