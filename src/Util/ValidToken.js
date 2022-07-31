import {TimeValid} from "./TimeValid";
import {useState} from "react";
import jwtDecode from "jwt-decode";

export function ValidToken(){


    if(localStorage.getItem('token')){
        const time = TimeValid();
        console.log("token here");
        return true;
    }
    else{
       console.log("no token")
        return false;
    }
}