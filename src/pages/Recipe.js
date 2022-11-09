import { useParams} from "react-router-dom";
import { useEffect, useState} from "react";
import axios from "axios";
import '../pages styles/RecipeStyles.css';

import jwtDecode from "jwt-decode";
import {TimeValid} from "../Util/TimeValid";
import {Logout} from "../Util/Logout";


import RecipeBody from "../Util/ReceptBody";
import RatingBody from "../Util/RatingBody";



const Recipe = () => {
    const {id} = useParams();
    const [recipe, setRecipes] = useState([]);
    const [comments, setComments] = useState([]);
    const [ownComment, setOwnComment] = useState([]);
    const [plzloginMessage, setPlz] = useState([""]);
    const [exist, setExist]= useState(["exist"]);




    useEffect(() => {
        //fetches the recipe from the backend if it doesnt exist it wil show an error on the page that it doesnt
        // it however will still show allot of the html elements emty
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


// adding a comment will add the comment to the set of comments but because it is a set the order of comments is random.
    //this will mostly show in backend.
    async function addComment(e) {
        e.preventDefault()
        if (localStorage.getItem('token') && TimeValid) {
            try {
                const token = localStorage.getItem('token');
                const tokenUser = jwtDecode(localStorage.getItem('token')).sub;
                const toSend = {

                    id: id,
                    body: ownComment,
                    fromUser: tokenUser

                }
                console.log(toSend)
                await axios({

                        method: "post",
                        url: `http://localhost:8080/addComment`,
                        data: toSend,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        }

                    },
                )
                window.location.reload();

            } catch (e) {
                console.error(e);
                console.log("Error: could not send comment");
                setPlz("Error: Could not send comment, message too short?");

            }
        } else {
            setPlz("You need to be logged in to leave a comment!");
        }
    }



    if(exist == "exist"){
    return <recipepage>

        <recipeBody>{RecipeBody(recipe)}</recipeBody>
        <rating>{RatingBody(recipe)}</rating>
        <commentsection className={"commentSection"}>
            <h3>Comments: </h3>
        {
            comments.map((comments, key) => {
                return <div className={"comments"} key ={key}>
                    <h3 className={"commentUser"}>{comments.fromUser}</h3>
                    <p className= "comment">{comments.body}</p>
                </div>

            })

        }
        </commentsection>

            <div>

                <form onSubmit={addComment} className={"ownComment"}>
                    <h3>{plzloginMessage}</h3>
                    <label>Leave a comment!</label>
                    <textarea className={"commentForm"}
                              type={"text"}
                              value={ownComment}
                              onChange={(e) => setOwnComment(e.target.value)}
                    />
                    <p className="note">A comment requires atleast 5 charachters!</p>
                    <button type="submit" className={"commentButton"}>Submit</button>

                </form>
            </div>

    </recipepage>;
    }
    else{
        return <noExisto className="noEx">
            Does not exist
        </noExisto>
    }
};

export default Recipe;
