import {useAppSelector} from "../redux/store.ts";
import "./component-styles.css"
import SameWidthCircularImage from "./SameWidthCircularImage.tsx";

function ProfileCard() {
    const user = useAppSelector((state) => state.user.user);
    return (
        <div className="card text-center w-25">
            <div className="card-body">
                <SameWidthCircularImage src="http://localhost:8080/static/jiyuu.jpg" />
                <h3>{user?.username}</h3>
            </div>
        </div>
    )
}

export default ProfileCard;