import {Link, useParams} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import axios from "axios";

const Recipe = () => {
    const {id} = useParams();
    const [recipe, setRecipes] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchRatedRecipes(){
            try{
                const response = await axios.get(`http://localhost:8080/${id}`);
                setRecipes(response.data)
                console.log(response.data.comments);
                setComments(response.data.comments)
            }catch(e){
                console.error(e);
                console.log("bestaat niet knuppel");
            }


        }

        fetchRatedRecipes();
    },[]);




    return <div>
        'http://localhost:8080/{id}'



        {
            comments.map((comments, key) => {
                return <div className={"comments"} key ={key}>
                    <p>{comments.fromUser}</p>
                    <p className= "comment">{comments.body}</p>
                </div>

            })

        }



    </div>;
};

export default Recipe;
