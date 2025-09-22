import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RedirectToDashboard(){
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/dashboard");
    }, [])

    return (
        <div>
            Redirecting to dashboard, please wait...
        </div>
    );
}

export default RedirectToDashboard;