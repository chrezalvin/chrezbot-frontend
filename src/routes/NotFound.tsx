import debug from "debug";
import { useNavigate } from "react-router-dom";

const log = debug("app:NotFound");

function NotFound(){
    const navigate = useNavigate();

    function backToDashboard(){
        navigate("/dashboard");
    }

    return(
        <div className="screen-center">
            <div className="display-flex flex-center text-center ">
                <h1>Page Not Found</h1>
                <p>The page you're trying to access does not exist!</p>
                <a
                    className={`btn btn-primary`}
                    style={{borderWidth: "5px"}}
                    onClick={backToDashboard}
                >Go to Dashboard</a>
            </div>
        </div>
    )
}

export default NotFound;