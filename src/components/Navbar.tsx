import "../style/navbar.css"
//asset file paths
import dashboardIcon from "../assets/dashboard.png"
import profileIcon from "../assets/profile.png"
import settingsIcon from "../assets/settings.png"
import mediaIcon from "../assets/media.png"
import postsIcon from "../assets/post.png"
import createIcon from "../assets/create.png"
import { NavigationButton } from "./navigationComponents";

//navbar element made with a bunch of navigation button components, passing in image and path for routing
export function Navbar(){
    return(
    <div className="navbar">
        <NavigationButton filepath={postsIcon}route="/Posts" label="Posts"/>
        <NavigationButton filepath={createIcon} route="/CreatePost" label="Create"/>
        <NavigationButton filepath={mediaIcon}route="/Media" label="Media"/>
        <NavigationButton filepath={dashboardIcon} route="/Dashboard"label="Dashboard"/>
        <NavigationButton filepath={profileIcon} route="/Profile" label="Profile"/>
        <NavigationButton filepath={settingsIcon}route="/Settings" label="Settings"/>
    </div>
    )
}
