import { useAppSelector } from "../hooks/customRedux";

function Profile(){
    const darkMode = useAppSelector(state => state.darkMode).value;

    return(
        <div className={`d-flex flex-column ${darkMode ? "text-white":"text-dark"}`}>
            <h1>This page is still under construction</h1>
        </div>
    );
}

export default Profile;