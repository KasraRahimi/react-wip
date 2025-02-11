import { useNavigate } from "react-router";
import { useAppDispatch } from "../../redux/store"
import { clearUser } from "../../redux/slices/userSlice";

function LogoutBtn() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(clearUser(true));
        navigate("/");
    }

    return (
        <button className="btn" onClick={onLogout}>Log Out</button>
    );
}

export default LogoutBtn;