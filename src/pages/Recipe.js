import {Link, useParams} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import axios from "axios";
import '../pages styles/RecipeStyles.css';

const Recipe = () => {
    const {id} = useParams();
    const [recipe, setRecipes] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchRatedRecipes(){
            try{
                const response = await axios.get(`http://localhost:8080/${id}`);
                setRecipes(response.data)
                console.log(response.data);
                setComments(response.data.comments)
            }catch(e){
                console.error(e);
                console.log("bestaat niet knuppel");
            }


        }

        fetchRatedRecipes();
    },[]);




    return <div>
        <h3 className={"from"}>From: {recipe.fromUser}</h3>
        <div className={"recipe"}>
            <div className={"ing+img"}>
            <img src={recipe.pictureLink} className={"image"}/>
            <h3 className={"ingredients"}> Ingredient List:</h3>
                <p>{recipe.ingredientList}</p>
            </div>
            <div className={"body"}>
            <h3 > Recipe: </h3>
            <p>{recipe.body}</p>
            </div>

        </div>
        <div className={"rated"}>
            <div className={"opinion"}>
            <h3 >Opinion:</h3>
            <p>{recipe.opinion}</p>
        </div>
            <h3 className={"rating"}> Rating: {recipe.rating}</h3>

        </div>




        <div className={"commentSection"}>
        {
            comments.map((comments, key) => {
                return <div className={"comments"} key ={key}>
                    <h3 className={"commentUser"}>{comments.fromUser}</h3>
                    <p className= "comment">{comments.body}</p>
                </div>

            })

        }
        </div>


    </div>;
};

export default Recipe;
