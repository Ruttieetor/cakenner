import { Outlet, Link } from "react-router-dom";
import '../pages styles/NavbarStyles.css';
import {Component, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {checkLogin, TimeValid} from "../Util/TimeValid";
import {ValidToken} from "../Util/ValidToken";


const Navbar = () => {

    const [login, setLogin] = useState(false);
    const valid = ValidToken();


    if (valid === false) {
        return (
            <>
                <nav>
                    <div className='banner'>
                        <h1>Cakenner</h1>

                    </div>
                    <div className='navBar'>
                        <Link to="/">Home</Link>
                        <Link to="/recipes">Recipes</Link>
                        <Link to="/sendRecipe">Send recipe</Link>
                        <Link to="/login">Login</Link>

                    </div>
                </nav>
                <Outlet/>
            </>
        )
    }
    ;

    if (valid === true) {
        return (
            <>
                <nav>
                    <div className='banner'>
                        <h1>Cakenner</h1>

                    </div>
                    <div className='navBar'>
                        <Link to="/">Home</Link>
                        <Link to="/recipes">Recipes</Link>
                        <Link to="/sendRecipe">Send recipe</Link>
                        <Link to="/login">Logout</Link>
                        <Link to="/rate">Rate recipe</Link>
                    </div>
                </nav>
                <Outlet/>
            </>
        )
    }
    ;
}
export default Navbar;
