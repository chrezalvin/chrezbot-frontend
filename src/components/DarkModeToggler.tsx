import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/customRedux";
import {toggle} from "../store/ToggleDarkMode";
import { useEffect } from "react";

import dark from "../assets/icons/darkMode.svg";
import light from "../assets/icons/lightMode.svg";

function DarkModeToggler(){
    const darkMode = useAppSelector((state) => state.darkMode.value)
    const dispatch = useDispatch();

    useEffect(() => {
        if(darkMode){
            document.body.classList.remove('bg-light');
            document.body.classList.add('bg-dark');
        }
        else{            
            document.body.classList.remove('bg-dark');
            document.body.classList.add('bg-light');
        }
    }, [darkMode]);

    return(
    <div className='position-absolute bottom-0 start-0 m-4' style={{zIndex: 999}}>
        <div className={`d-flex flex-column justify-content-center p-2 rounded-2 align-self-center ${darkMode ? "bg-light" : "bg-dark"}`}>
            <div className={`d-flex justify-content-center`}>
                <img
                    src={darkMode ? dark : light}
                    width={30}
                    height={30}
                    alt="" 
                    onClick={() => {dispatch(toggle())}}
                />
            </div>
        </div>
    </div>
    )
}

export default DarkModeToggler;