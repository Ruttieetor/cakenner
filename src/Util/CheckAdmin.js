import jwtDecode from "jwt-decode";
import axios from "axios";


//an old relic of checking admin the localstorage part wasn't working as intended so this was left alone but left here
//in case of revisiting this issue
 export async function CheckAdmin(username) {

        console.log(`localhost:8080/IsAdmin/${username}`)

        try {
            const response = await axios.get(`http://localhost:8080/IsAdmin/${username}`)
            //localStorage.setItem('admin', response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }

