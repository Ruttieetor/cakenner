import {Component, useEffect, useState} from "react";
import axios from'axios'
//import '../pages styles/LogStyles.css';
import {ValidToken} from "../Util/ValidToken";
import {Logout} from "../Util/Logout";
import {Link} from "react-router-dom";

const Register = () => {
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [email, setEmail]=useState('');
    const [message, setMessage]=useState('');


    async function register(e){
        e.preventDefault()
        try{
            const response = await axios.post(`http://localhost:8080/register`,{
                username: username,
                password: password,
                email: email
            });
            console.log("Account has been created");
            setMessage("Account has been created");

        }catch(e){
            console.log(e.response.data);
            setMessage(e.response.data);
        }

    }

    return(
        <div>
            <form onSubmit={register}>
                <label>
                    <p>Username</p>
                    <input
                        type="text"
                        name="username"
                        id="registerUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        id="registerPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <label>
                    <p>E-mail</p>
                    <input
                        type="email"
                        name="email"
                        id="registerEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <div>
                    <p>{message}</p>
                    <button type="submit">Register</button>
                </div>


                <p></p>
            </form>











        </div>
    );
}
export default Register;