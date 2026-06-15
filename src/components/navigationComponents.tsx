import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png"

//used to define what props are being passed to NavigationButton component
interface navBarArgs {
    filepath: string,
    route: string,
    label : string
};
// for back button component
export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <div className="navbarelements" onClick={ () => navigate(-1)}>
            <img className="navbarImage" src={backIcon}/>
        </div>
    )
}

//generic button for navbar
export const NavigationButton :FC<navBarArgs> = ({filepath, route, label}) => {
    const navigate = useNavigate();
    return(
        <div className="navbarelements" onClick={ () => navigate(route)}>
            <img className="navbarImage" src={filepath}/>
            <label className="navbarLabel">{label}</label>
        </div>
    )
}