import {useParams} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import axios from "axios";

const Recipe = () => {
    const {id} = useParams();
    const [recipe, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRatedRecipes(){
            try{
                const response = await axios.get(`http://localhost:8080/${id}`);
                //setRecipes(response.data)
                console.log(response.data);
            }catch(e){
                console.error(e);
                console.log("bestaat niet knuppel");
            }


        }

        fetchRatedRecipes();
    },[]);




    return <div>
        'http://localhost:8080/${id}'
    </div>;
};

export default Recipe;
