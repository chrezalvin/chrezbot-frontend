import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/customRedux";

function UnderConstruction(){
    const darkMode = useAppSelector(state => state.darkMode).value;
    const navigate = useNavigate();

    return (
        <div className={`screen-center ${darkMode ? "text-white": "text-dark"}`}>
            <div id="errorBox">
                <h1>Under Construction</h1>
                <p className="text-center">
                    This page is still under construction!
                </p>
                <p className="text-center">
                    <a className={`${darkMode ? "link-light": "link-dark"}`} onClick={() => {navigate("/")}}>
                        go back to dashboard
                    </a>
                </p>
            </div>
        </div>
    );

}

export default UnderConstruction;