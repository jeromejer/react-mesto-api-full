import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from '../images/logo.svg'

function Header({loggedIn, email, handleSignOut}) {
    const location = useLocation()
    const text = `${location.pathname === "/sign-in" ? "Регистрация" : "Войти"}`;
    const linkRoute = `${location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`;


    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип Mesto" className="header__logo" />
            <div className="header__block">
                {loggedIn ?  (
                <>
                    <p className="header__email">{email}</p> 
                    <Link className="header__text" to="/sign-in" style={{color: "#A9A9A9"}} onClick={handleSignOut}>Выйти</Link> 
                </> )  :  (
                <Link className="header__text" to={linkRoute}>{text}</Link>
                )}
            </div>
        </header>
    )
}

export default Header;
