import { useNavigate } from "react-router";
import { useAppDispatch } from "../../redux/store"
import { clearUser } from "../../redux/slices/userSlice";

interface LogoutProps {
    className?: string,
}

function LogoutBtn({ className }: LogoutProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(clearUser(true));
        navigate("/");
    }

    return (
        <button className={className} onClick={onLogout}>Log Out</button>
    );
}

export default LogoutBtn;