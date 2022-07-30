import {Component, useEffect, useState} from "react";
import axios from'axios'
import '../pages styles/LogStyles.css';
import {ValidToken} from "../Util/ValidToken";
import {Logout} from "../Util/Logout";
import {Link} from "react-router-dom";

const Login = () => {
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [showError, setShowError]=useState('');


    const refresh = () => {
        window.location.reload();
    }

    const valid = ValidToken();
    console.log(valid);


    async function login(e){
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:8080/auth',{
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data);

            refresh();

                }catch(e){
            console.error(e);
            setShowError("Username or password incorrect");

        }

        }
    if(valid === true){
        return(
            <div className={"loggedIn"}>
                <div className={"innerbox"}>
                <p> You are logged in!</p>
                <button type="button"  onClick={Logout}>Logout</button>
                </div>
            </div>
        )
    }else{
    return(
        <div className={"loggedOut"}>

        <form onSubmit={login}>
            <label>
                <p>Username</p>
                <input
                    type="text"
                    name="username"
                    id="loginusername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                <p>Password</p>
                <input
                    type="password"
                    name="password"
                    id="loginpassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
            </label>
            <div>
                <p> </p>
                <button type="login"  className={"loginButton"}>Submit</button>
            </div>
            <p>{showError}</p>
        </form>

            <div className={"registerLink"}>
            <p>No account? Register now! <br></br> </p>
            <Link to="/register" >Register</Link>
            </div>
        </div>
    )
    }
};

export default Login;