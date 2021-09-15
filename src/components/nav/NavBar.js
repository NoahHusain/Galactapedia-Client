import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"



export const NavBar = (props) => {
    const logout = () => {
        localStorage.clear("Galactapedia_user_token")
        localStorage.clear("Galactapedia_user_admin")
    }
    return (
        <>
        <ul className="navbar1">
        <li className="navbar__item active">
                <Link className="navbar__link" to="/">Galactapedia</Link>
        </li>
        <li className="alignRight navbar__item active">
                <Link onClick={logout}className="navbar__link" to="/login">Logout</Link>
        </li>
        </ul>
        </>
    )
}