import { useAppSelector, useAppDispatch} from "../hooks/customRedux";
import {DISCORD_OAUTH_URL} from "../config";
import { useNavigate, useSearchParams } from "react-router-dom";

import { assign } from "../store/User";
import { useEffect, useState } from "react";
import { getSessionKey, getUser } from "../functions/API";

import Cookies from "universal-cookie";

const cookies = new Cookies();

function Base(){
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState<string>("");

    useEffect(() => {
    }, [])

    return(
        <h1>Dashboard</h1>
    )
}

export default Base;