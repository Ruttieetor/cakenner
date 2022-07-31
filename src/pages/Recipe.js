import {Link, useParams} from "react-router-dom";
import {Component, useEffect, useState} from "react";
import axios from "axios";
import '../pages styles/RecipeStyles.css';
import {GetUsername} from "../Util/GetUsername";
import {ValidToken} from "../Util/ValidToken";
import jwtDecode from "jwt-decode";
import {TimeValid} from "../Util/TimeValid";

const Recipe = () => {
    const {id} = useParams();
    const [recipe, setRecipes] = useState([]);
    const [comments, setComments] = useState([]);
    const [ownComment, setOwnComment] = useState([]);
    const [plzloginMessage, setPlz] = useState([""]);
    const [exist, setExist]= useState([""]);

    useEffect(() => {
        async function fetchRatedRecipes(){
            try{
                const response = await axios.get(`http://localhost:8080/recipe/${id}`);
                setRecipes(response.data)
                //console.log(response.data);
                setComments(response.data.comments)
            }catch(e){
                console.error(e);
                console.log("Recipe doesnt exist");
                setExist("Recipe doesnt exist")
            }


        }

        fetchRatedRecipes();
    },[]);



    async function addComment(e) {
        e.preventDefault()

            try {
                const token = localStorage.getItem('token');
                const tokenUser = jwtDecode(localStorage.getItem('token')).sub;

                const response = await axios.post("http://localhost:8080/addComment",
                    {
                        id: id,
                        body: ownComment,
                        fromUser: tokenUser
                    });
                window.location.reload();

            } catch (e) {
                console.error(e);
                console.log("Error: could not send comment");
                setPlz("Error: could not send comment, are you logged in?");

            }
        }


    return <div>
        <h3>{exist}</h3>
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
            <h3>Comments: </h3>
        {
            comments.map((comments, key) => {
                return <div className={"comments"} key ={key}>
                    <h3 className={"commentUser"}>{comments.fromUser}</h3>
                    <p className= "comment">{comments.body}</p>
                </div>

            })

        }
        </div>

            <div>

                <form onSubmit={addComment} className={"ownComment"}>
                    <h3>{plzloginMessage}</h3>

                    <label>Leave a comment!</label>
                    <textarea className={"commentForm"}
                              type={"text"}
                              value={ownComment}
                              onChange={(e) => setOwnComment(e.target.value)}
                    />

                    <button type="submit" className={"commentButton"}>Submit</button>

                </form>
            </div>

    </div>;
};

export default Recipe;
