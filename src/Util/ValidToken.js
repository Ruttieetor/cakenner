import {TimeValid} from "./TimeValid";
import {useState} from "react";

export function ValidToken(){
    const token = localStorage.getItem('token');

    if(token){
        const time = TimeValid();
        console.log("token here");
        return true;
    }
    else{
        console.log("no token")
        return false;
    }
}