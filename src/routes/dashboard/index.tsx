import { RouteObjectWithContext } from "../../library/RouteObjectWithContext";
import Events from "./Events";
import About from "./About";
import Recommends from "./Recommends";
import ActiveEvents from "./ActiveEvents";

export const routes: RouteObjectWithContext[] = [
    {
        pathName: "Event",
        description: "View, Create or Delete Events",
        routeObject: {
            path: "/dashboard/events",
            element: <Events />,
        },
    },
    {
        pathName: "About Me",
        description: "About us but me",
        routeObject: {
            path: "/dashboard/about",
            element: <About />
        }
    },
    {
        pathName: "Recommends",
        description: "Edit Recommendations from Chrez recommend",
        routeObject:{
            path: "/dashboard/recommends",
            element: <Recommends />
        }
    },
    {
        pathName: "Active Events",
        description: "View Active Events",
        routeObject:{
            path: "/dashboard/activeEvents",
            element: <ActiveEvents />
        }
    }
]