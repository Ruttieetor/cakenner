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
            const token = jwtDecode(localStorage.getItem('token'));
            //console.log(token.sub);
            //console.log(`http://localhost:8080/IsAdmin/${token.sub}`);
            try {
                const response = await axios.get(`http://localhost:8080/IsAdmin/${token.sub}`);
                setAdmin(response.data);
                //console.log(response.data)
            } catch (e) {
                console.error(e);
            }


        }
        isAdmin();

}, []);


    return (
        <>
            <nav>
                <div className='banner'>
                    <h1>Cakenner</h1>

                </div>
                <div className='navBar'>
                    <Link to="/">Home</Link>
                    <Link to="/recipes">Recipes</Link>
                    {(!localStorage.getItem('token')) && <Link to="/login">Login</Link>}
                    {(localStorage.getItem('token')) && <Link to="/login">Logout</Link>}
                    {(localStorage.getItem('token')) && <Link to="/sendRecipe">Send recipe</Link>}
                    {admin === "yes" && (localStorage.getItem('token')) && <Link to="/rate">Rate recipe</Link>}

                </div>
            </nav>
            <Outlet/>
        </>
    )
}
//;
//}
export default Navbar;
