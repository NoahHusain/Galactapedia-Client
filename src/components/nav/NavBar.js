import React, { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { NavBarContext } from "./NavBarProvider";
import "./NavBar.css"



export const NavBar = (props) => {
    const { searchByName } = useContext(NavBarContext);
    const [ stellarObject, setStellarObject ] = useState({})
    const [value, setValue] = useState("")
    const history = useHistory();


    const logout = () => {
        localStorage.clear("Galactapedia_user_token")
        localStorage.clear("Galactapedia_user_admin")
    }
    const Search = () => {
        searchByName(value).then(setStellarObject)
        history.push(`/wiki/${stellarObject?.id}`)
    }

    const handleControlledInputChange = (event) => {
        const value = event.target.value
        setValue(value);
      };
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
        <div class="topnav alignRight">
        <input type="text" onChange={handleControlledInputChange} placeholder="Search.."/>
        <button onClick={Search}>Search</button>
        </div>
        </>
    )
}