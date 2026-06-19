import React, { useEffect } from "react";
import "../style/layout.css";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from '../GlobalContext';

const LogoSVG = () => (
    <svg width="140" height="30" viewBox="0 0 680 140" xmlns="http://www.w3.org/2000/svg">
      <text x="20" y="95"
        fontFamily="Arial Black, Impact, sans-serif"
        fontSize="82"
        fontWeight="900"
        fontStyle="italic"
        fill="#ffffff"
        letterSpacing="3">OVERCLOCK</text>
      <text x="24" y="128"
        fontFamily="Arial, sans-serif"
        fontSize="30"
        fontWeight="400"
        fill="#ffffff"
        letterSpacing="22">MEDIA</text>
    </svg>
  );

const AvatarSVG = ({ initials }: { initials: string }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="18" fill="#444"/>
    <text x="18" y="23"
      fontFamily="Arial, sans-serif"
      fontSize="14"
      fontWeight="600"
      fill="white"
      textAnchor="middle">{initials}</text>
  </svg>
);

const Header: React.FC = () => {
    const location = useLocation(); //to get current page URL path

    const isPublicPage = location.pathname === "/" || location.pathname.toLowerCase() === "/login";

    const context = useGlobalContext();
    const { user } = context!;
    const API_URL = `http://localhost:3000`;

    useEffect(() => {
        if (user) {
            fetch(`${API_URL}/users/${user.id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Couldn't fetch user data");
                    return res.json();
                });
        }
    }, [user, API_URL]);

    if (isPublicPage) return null;

    const userName = user?.FirstName ?? "";
    const initials = userName?.[0]?.toUpperCase() ?? "U";

    return (
        <header className="header-container">
            <nav className="header-nav">
                <ul className="header-list">
                    <li className="left-section">
                        <Link to="/Dashboard">
                            <LogoSVG />
                        </Link>
                    </li>
                    <li className="right-section">
                        <span className="user-greeting">Hi, {userName}</span>
                        <Link to="/Profile">
                            <AvatarSVG initials={initials} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;