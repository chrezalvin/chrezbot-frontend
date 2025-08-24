import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";

import Authenticate from "./Authenticate";
import Profile from "./Profile";
import NotFound from "./NotFound";
import RedirectToAuth from "./RedirectToAuth";
import {routes} from "./dashboard";
import MenuWrapper from "../components/MenuWrapper";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RedirectToAuth />
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/authenticate",
        element: <Authenticate />,
    },
    {
        path: "/dashboard",
        element: <MenuWrapper routeList={routes} children={<Outlet/>} />,
        children: routes.map((route) => {
            return {
                path: route.routeObject.path,
                element: route.routeObject.element
            }
        })
    },
    {
        path: "*",
        element: <NotFound />
    },
]);

// export const router = createBrowserRouter([...routesLanding, ...dashboardRoutes].map(route => route.routeObject));

