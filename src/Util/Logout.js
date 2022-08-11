import { Redirect } from 'react-router-dom';


export function Logout(){

        localStorage.removeItem('token');
        window.location.href = "http://localhost:3000/";
        //window.location.reload();
    }
