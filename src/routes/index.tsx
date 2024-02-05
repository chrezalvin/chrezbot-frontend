import {
    RouteObject,
    createBrowserRouter
} from "react-router-dom";

import Events from "./Events";
import Base from "./Base";
import ErrorPage from "./error";
import Authenticate from "./Authenticate";
import About from "./About";
import Profile from "./Profile";
import recommends from "./Recommends";
import UnderConstruction from "./underConstruction";

import MenuWrapper from "../components/MenuWrapper";
import Recommends from "./Recommends";

export interface RouteObjectWithContext{
    pathName: string;
    description: string;
    routeObject: RouteObject;
}

export const routesLanding: RouteObjectWithContext[] = [
    {
        pathName: "Authentication",
        description: "Account verification page",
        routeObject: {
            path: "/Authenticate",
            element: <Authenticate />
        }
    },
    {
        pathName: "Profile Page",
        description: "",
        routeObject: {
            path: "/profile",
            element: <UnderConstruction />
        }
    }
]

export const routesApp: RouteObjectWithContext[] = [
    {
        pathName: "Dashboard",
        description: "The root of ChrezbotApp",
        routeObject: {
            path: "/",
            element: <MenuWrapper><Base/></MenuWrapper>,
            errorElement: <ErrorPage />
        }
    },
    {
        pathName: "Event",
        description: "View, Create or Delete Events",
        routeObject: {
            path: "/events",
            element: <MenuWrapper><Events /></MenuWrapper>
        }
    },
    {
        pathName: "About Me",
        description: "About us but me",
        routeObject: {
            path: "/about",
            element: <MenuWrapper><About /></MenuWrapper>
        }
    },
    {
        pathName: "Recommends",
        description: "Edit Recommendations from Chrez recommend",
        routeObject:{
            path: "/recommends",
            element: <MenuWrapper><Recommends /></MenuWrapper>
        }
    }
]

export const router = createBrowserRouter([...routesLanding, ...routesApp].map(route => route.routeObject));

