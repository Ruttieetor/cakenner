import {useState} from "react";
import '../pages styles/SendRecipe.css';
import axios from "axios";
import jwtDecode from "jwt-decode";
import {TimeValid} from "../Util/TimeValid";
import {Logout} from "../Util/Logout";


const SendRecipe = () => {


    const [ingrList, setIngrList] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [recipeName, setRecipeName] = useState([]);
    const [message, setMessage] = useState([""]);

//checks if the token is in storage and it isnt expired if its either not there or expired it won't show thr html elements
    if (localStorage.getItem('token') && TimeValid) {
        const user = jwtDecode(localStorage.getItem('token')).sub;
        const toSend = {

            name: recipeName,
            ingredientList: ingrList,
            body: recipe,
            fromUser: user

        }

//sends the recipe to the backend this wont work without jwt token you get from login
        async function SendRecipetoBE(e) {
            e.preventDefault()
            //console.log({"Authorization": `Bearer ${localStorage.getItem('token')}`})
            try {


                await axios({

                        method: "post",
                        url: `http://localhost:8080/postRecipe`,
                        data: toSend,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`,

                        }

                    },
                    setMessage("Recipe has been send!")
                )


            } catch (e) {

                setMessage("error");
            }
        }


        return (<div>

            <form onSubmit={SendRecipetoBE} className={"wholeRecipe"}>
                <label>Name: </label>
                <input
                    className={"RecipeName"}
                    type="text"
                    name="username"
                    id="name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />


                <label>Ingredient list: </label>
                <textarea className={"IngrList"} onChange={(e) => setIngrList(e.target.value)}>

            </textarea>

                <label>Recipe: </label>
                <textarea className={"SendRecipe"} onChange={(e) => setRecipe(e.target.value)}>

            </textarea>

                <label>{message}</label>
                <button type="submit" className={"buttonSubmit"}>Submit</button>
            </form>


            <label><br/><br/><br/><br/><br/></label>
        </div>)
    } else {
        Logout();
        return (<label><br/>ACCES DENIED</label>)
    }
};
export default SendRecipe;
