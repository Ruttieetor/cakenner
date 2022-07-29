import jwtDecode from "jwt-decode";



export function TimeValid(){
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const now = Date.now();
    if(now < decodedToken.exp * 1000 ){
        const valid = true;
        console.log("Time Valid");
        return valid;

    }else{
        const valid = false;
        localStorage.removeItem('token');
        return valid;
    }
}




