import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RedirectToAuth(){
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/authenticate");
    }, [])

    return (
        <div>
            Redirecting to authenticate, please wait...
        </div>
    );
}

export default RedirectToAuth;