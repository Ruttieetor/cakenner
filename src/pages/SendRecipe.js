import {ValidToken} from "../Util/ValidToken";
import {useState} from "react";
import '../pages styles/SendRecipe.css';
import axios from "axios";
import jwtDecode from "jwt-decode";
import {TimeValid} from "../Util/TimeValid";


const SendRecipe = () => {

    const [ingrList, setIngrList] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [recipeName, setRecipeName] = useState([]);
    const user = jwtDecode(localStorage.getItem('token')).sub;
    const [message, setMessage] = useState(["weeeeeeeee"]);





    async function SendRecipetoBE(e){
        e.preventDefault()
        //console.log({"Authorization": `Bearer ${localStorage.getItem('token')}`})
        try {
            const response = await axios.post(`http://localhost:8080/postRecipe`,
                {
                    name: recipeName,
                    ingredientList: ingrList,
                    body: recipe,
                    fromUser: user
                },
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
                );


                setMessage("Recipe has been send!")

        }catch(e){

            setMessage("oopsie");
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
            <textarea  className={"SendRecipe"} onChange={(e) => setRecipe(e.target.value)}>

            </textarea>

                <label>{message}</label>
                <button type="submit" className={"buttonSubmit"}>Submit</button>
            </form>


        </div>)
    };
export default SendRecipe;
