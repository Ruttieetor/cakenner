import jwtDecode from "jwt-decode";


export function GetUsername(){
const token = jwtDecode(localStorage.getItem('token'));
console.log(token.sub);
return token.sub;

}