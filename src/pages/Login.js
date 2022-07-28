import {Component, useEffect, useState} from "react";
import axios from'axios'
import '../pages styles/HomeStyles.css';
import {Link} from "react-router-dom";
import {Navigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";

const Login = () => {
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [showError, setShowError]=useState('');
    const decode = jwtDecode(localStorage.getItem('token'));
    const refresh = () => {
        window.location.reload();
    }
    async function login(e){
        e.preventDefault()
        console.log(username,password)

        try{
            const response = await axios.post('http://localhost:8080/auth',{
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data);
            console.log(jwtDecode(response.data))
            console.log(Date.now());

            refresh();

                }catch(e){
            console.error(e);
            setShowError("Username or password incorrect");

        }

        }



    return(
        <div>
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
                <button type="login">Submit</button>
            </div>
        </form>
            <p>{showError}</p>
        </div>
    )
};

export default Login;