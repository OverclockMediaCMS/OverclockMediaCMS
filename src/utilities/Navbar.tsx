import { useNavigate } from "react-router-dom";
import { type FC } from "react";
import "../style/navbar.css"
//asset file paths
import dashboardIcon from "../assets/dashboard.png"
import profileIcon from "../assets/profile.png"
import settingsIcon from "../assets/settings.png"
import mediaIcon from "../assets/media.png"
import postsIcon from "../assets/post.png"

//used to define what props are being passed to NavigationButton component
interface navBarArgs {
    filepath: string,
    route: string,
    label : string
};

//generic button for navbar
const NavigationButton :FC<navBarArgs> = ({filepath, route, label}) => {
    const navigate = useNavigate();
    return(
        <div className="navbarelements" onClick={ () => navigate(route)}>
            <img className="navbarImage" src={filepath}/>
            <label className="navbarLabel">{label}</label>
        </div>
    )
}

//navbar element made with a bunch of navigation button components, passing in image and path for routing
export function Navbar(){
    return(
    <div className="navbar">
        <NavigationButton filepath={postsIcon}route="/Posts" label="Posts"/>
        <NavigationButton filepath={mediaIcon}route="/Media" label="Media"/>
        <NavigationButton filepath={dashboardIcon} route="/Dashboard"label="DashBoard"/>
        <NavigationButton filepath={profileIcon} route="/Profile" label="Profile"/>
        <NavigationButton filepath={settingsIcon}route="/Settings" label="Settings"/>
    </div>
    )
}