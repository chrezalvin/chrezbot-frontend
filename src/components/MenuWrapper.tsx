import { PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "../hooks/customRedux";

import defaultAvatar from "../assets/icons/logo.svg";
import { RouteObject, useLocation, useNavigate } from "react-router-dom";

import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

import "./MenuWrapper.css";
import defaultLogo from "../assets/icons/logo.svg";
import DarkModeToggler from "./DarkModeToggler";

import UserWidget from "./UserWidget";

export interface RouteObjectWithContext{
    pathName: string;
    description: string;
    routeObject: RouteObject;
}

interface MenuWrapperProps extends PropsWithChildren{
    routeList: RouteObjectWithContext[];
}

function MenuWrapper(props: MenuWrapperProps){
    const user = useAppSelector(state => state.user);
    const discordUser = useAppSelector(state => state.discordUser);
    const darkMode = useAppSelector(state => state.darkMode).value;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(props.routeList);
        if(user === null)
            navigate("/authenticate");
    }, []);

    const sidebarRoutesUI = props.routeList.map(route => {
        return (
        <Nav.Item>
            <Nav.Link disabled={location.pathname === route.routeObject.path!} onClick={() => {
                if(route.routeObject.path)
                    navigate(route.routeObject.path);
            }}>
                <img 
                    src={defaultLogo} 
                    width={30} 
                    height={30} 
                    alt="" 
                />{" "}
                {route.pathName}
            </Nav.Link>
        </Nav.Item>
        )
    });

    const dropDownRoutesUI = props.routeList.map(route => {
        return(
        <Nav.Link 
            disabled={location.pathname === route.routeObject.path!}
            onClick={() => {
                if(route.routeObject.path)
                    navigate(route.routeObject.path);
            }}
        >{route.pathName}</Nav.Link>
        );
    })

    return(
        <div className={`vh-100 vw-100 ${darkMode ? "bg-dark text-light": "bg-light text-dark"}`} style={{boxSizing: "border-box"}}>
            <DarkModeToggler />
            <header id="header" style={{borderBlockEnd: `3px solid white`}}>
                <Navbar collapseOnSelect expand="lg" variant={darkMode ? "dark": "light"} className="h-100 navbar-expand-md">
                    <Container className="p-0 my-2">
                        <Navbar.Brand href="#" className="fw-bold">
                            Chrez-Bot
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="d-lg-none d-md-none">
                                {dropDownRoutesUI}
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Brand href="#" className="d-lg-block d-md-block d-sm-none">
                            {
                                !discordUser || user === null ? "Loading..." : (
                                    <UserWidget
                                        role={user.role} 
                                        username={user.username}
                                        avatar_url={discordUser.avatarURL ?? defaultAvatar}
                                        aliases={user.aliases}
                                        timezone={user.timezone}
                                        user_id={user.user_id}
                                        darkMode={darkMode}
                                    />
                                )
                            }
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </header>
            <Container fluid>
            <Row className="h-100">
                <Col 
                    sm={12} 
                    md={3} 
                    lg={3} 
                    id="sideBarMenu" 
                    className={`${darkMode ? "bg-dark" : "bg-light"} p-2 d-sm-none d-lg-block d-md-block me-2 overflow-scroll scrollbar-hidden`}
                    style={{height: "85vh", borderInlineEnd: "3px solid white"}}>
                    <aside>
                        <Nav className="flex-column">
                            <h2 className="text-center">Pages</h2>
                            {sidebarRoutesUI}
                        </Nav>
                    </aside>
                </Col>
                <Col sm md lg className="mx-2 py-2 overflow-scroll scrollbar-hidden" style={{height: "85vh"}} >
                    {props.children}
                </Col>
            </Row>
            </Container>
        </div>
    );
    }
    
    export default MenuWrapper;