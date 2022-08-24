import jwtDecode from "jwt-decode";

//extract username from token
export function GetUsername(){
const token = jwtDecode(localStorage.getItem('token'));
console.log(token.sub);
return token.sub;

}