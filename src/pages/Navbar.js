import {Outlet, Link} from "react-router-dom";
import '../pages styles/NavbarStyles.css';
import {Component, useEffect, useState} from "react";
import {CheckAdmin} from "../Util/CheckAdmin";
import axios from "axios";
import jwtDecode from "jwt-decode";


const Navbar = () => {
    const [admin, setAdmin] = useState(["no"]);


    useEffect(() => {
        async function isAdmin() {
            //checks if the user is an admin if yes it will set the state
            const token = jwtDecode(localStorage.getItem('token'));
            try {
                const response = await axios.get(`http://localhost:8080/IsAdmin/${token.sub}`);
                setAdmin(response.data);
            } catch (e) {
                console.error(e);
            }


        }

        isAdmin();

    }, []);

//it will show more option depending if the JWT is in localstorage and if the state of being admin is 'yes'
    return (
        <>
            <nav>
                <title className='banner'>
                    <h1>Cakenner</h1>

                </title>
                <navLinks className='navBar'>
                    <Link to="/">Home</Link>
                    <Link to="/recipes">Recipes</Link>
                    {(!localStorage.getItem('token')) && <Link to="/login">Login</Link>}
                    {(localStorage.getItem('token')) && <Link to="/login">Logout</Link>}
                    {(localStorage.getItem('token')) && <Link to="/sendRecipe">Send recipe</Link>}
                    {admin === "yes" && (localStorage.getItem('token')) && <Link to="/rate">Rate recipe</Link>}

                </navLinks>
            </nav>
            <Outlet/>
        </>
    )
}
//;
//}
export default Navbar;
