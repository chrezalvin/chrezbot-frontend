import { Dropdown } from "react-bootstrap";
import sourDough from "../sourdough.jpg";

import { UserState } from "../store/User";

import logOutLogo from "../assets/icons/logOut.svg";
import userLogo from "../user.svg";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import { useAppSelector } from "../hooks/customRedux";
const cookies = new Cookies();

interface IProps extends UserState{
    darkMode: boolean;
    avatar_url: string;
}

function UserWidget(props: IProps){
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user);
    const sessionKey = useAppSelector(state => state.sessionKey);

    return (
        <Dropdown>
            <Dropdown.Toggle 
                variant="none"
                className={`${props.darkMode ? "text-white": "text-dark"} fw-bold`}
                style={{border: "none"}}
            >
                {props.username}{' '}
                <img
                    src={props.avatar_url ?? sourDough}
                    width="30"
                    height="30"
                    className="d-inline-block align-top rounded-circle"
                    alt="React Bootstrap logo"
                />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item 
                    onClick={() => {navigate("/profile")}}
                >
                    <img 
                        src={userLogo} 
                        className="text-warning"
                        width={30}
                        height={30}
                        alt=""
                    />{' '}
                    View Profile
                </Dropdown.Item>
                <Dropdown.Item
                    href="#/action-2"
                    onClick={() => {
                        
                    }}
                >
                    <img 
                        src={logOutLogo} 
                        className="text-warning" 
                        width={30}
                        height={30}
                        onClick={() => {
                            cookies.remove("SESSION_KEY");
                        }}
                        alt="" 
                    />{' '}
                    Log Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        );
    }
    
    export default UserWidget;