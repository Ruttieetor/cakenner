import {Component, useEffect, useState} from "react";
import axios from'axios'
import '../pages styles/HomeStyles.css';
import {Link} from "react-router-dom";

const Login = () => {

    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');

    async function login(e){
        e.preventDefault()
        console.log(username,password)

        try{
            const response = await axios.post('http://localhost:8080/auth',{
                username: username,
                password: password
            });
            localStorage.setItem('token', response.data)
                }catch(e){
            console.error(e);

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
            <p>{localStorage.getItem('token')}</p>
        </div>
    )
};

export default Login;