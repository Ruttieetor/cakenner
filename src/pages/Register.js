import {useState} from "react";
import axios from'axios'


const Register = () => {
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [email, setEmail]=useState('');
    const [message, setMessage]=useState('');

// registering doesn't do any checks so the user better be typing correctly it only checks if the username is unique
// in the backend and will send an error if it's not.
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
            window.location.href = "http://localhost:3000/login";

        }catch(e){
            console.log(e.response.data);
            setMessage(e.response.data);
        }

    }

    return(
        <registerPage>
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

                <registerButtonAndErrorMessages>
                    <p>{message}</p>
                    <button type="submit">Register</button>
                </registerButtonAndErrorMessages>


                <p></p>
            </form>











        </registerPage>
    );
}
export default Register;