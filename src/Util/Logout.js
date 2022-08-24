import { Redirect } from 'react-router-dom';

//forces a logout by deleting the token
export function Logout(){

        localStorage.removeItem('token');
        window.location.href = "http://localhost:3000/";
        //window.location.reload();
    }
