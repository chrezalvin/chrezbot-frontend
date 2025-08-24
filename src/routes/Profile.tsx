import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/customRedux";

function Profile(){
    const darkMode = useAppSelector(state => state.darkMode).value;
    const user = useAppSelector(state => state.user);
    const discordUser = useAppSelector(state => state.discordUser);
    const navigate = useNavigate();

    return(
        <div 
            className={`d-flex p-4 align-items-center flex-column ${darkMode ? "text-white bg-dark":"text-dark bg-white"}`}
        >
            <img 
                width={100}
                height={100}
                src={discordUser?.avatarURL} 
                alt={`${user?.username}'s Profile`}
                className="rounded-circle"
            />
            <h2>{user?.username}</h2>
            <h3>{user?.timezone}</h3>
            <h3>{user?.role}</h3>

            <a
                className={`${darkMode ? "link-light": "link-dark"}`}
                onClick={() => {navigate("/dashboard")}}
            >Go back to dashboard</a>
        </div>
    );
}

export default Profile;