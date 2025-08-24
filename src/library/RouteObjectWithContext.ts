import { RouteObject } from "react-router-dom";

export interface RouteObjectWithContext{
    pathName: string;
    description: string;
    routeObject: RouteObject;
}