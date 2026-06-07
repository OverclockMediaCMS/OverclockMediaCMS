import React from "react";
import "../style/layout.css";
import { Link, useLocation } from "react-router-dom";


const Header: React.FC = () => {
    const location = useLocation(); //to get current page URL path

    const isPublicPage = location.pathname === "/" || location.pathname.toLowerCase() === "/login";

    const logoImage = (
        <img src="https://placehold.jp/200x100.png" alt="Overclock Media Logo Wireframe" className="wireframe-logo" />
    )

    return (
        <header className="header-container">
            {isPublicPage ? (
                null
            ) : (
                <>
                    <nav className="header-nav">
                        <ul className="header-list">
                            <li className="left-section">
                                <Link to="/Dashboard"><img src="https://placehold.jp/200x100.png" alt="Overclock Media Logo Wireframe" className="wireframe-logo" /></Link>
                            </li>
                            <li className="header-title"><h1>Overclock Media</h1></li>
                            <li className="right-section">
                                <h3 className="user-greeting">Hi, User!</h3>
                                <Link to="/Profile"><img src="https://placehold.jp/24/cccccc/ffffff/40x40.png?text=U" alt="User" className="user-wireframe" /></Link>
                            </li>
                        </ul>
                    </nav>
                </>
            )}

        </header>
    );
};


export default Header;