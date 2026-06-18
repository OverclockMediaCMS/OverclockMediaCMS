import React, { useState, useEffect } from "react";
import "../style/layout.css";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from '../GlobalContext';


const Header: React.FC = () => {
    const location = useLocation(); //to get current page URL path

    const isPublicPage = location.pathname === "/" || location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === '/register';

    const context = useGlobalContext();

    const { user } = context!;

    const API_URL = `http://localhost:3000`;

    useEffect(() => {
        if (user) {
            fetch(`${API_URL}/users/${user.id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Couldn't fetch user data");
                    return res.json();
                })
        }
    }, [user, API_URL]);


    const userName = `${user?.FirstName}`;

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
                                <h3 className="user-greeting">Hi, {userName}</h3>
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