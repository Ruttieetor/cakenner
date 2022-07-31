import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import '../pages styles/SendRatedStyles.css';


const SendRated = () => {

    const {id} = useParams();
    const [recipeName, setRecipeName] = useState([]);
    const [ingrList, setIngrList] = useState([]);
    const [body, setBody] = useState([]);
    const [message, setMessage] = useState([]);
    const [opinion, setOpinion] = useState([]);
    const [rating, setRating]= useState([]);
    const [pictureLink, setPictureLink] = useState([]);
    const [fromuser, setFromUser] = useState([]);

useEffect(() => {

    async function fetchRecipe() {
        try {
            const response = await axios.get(`http://localhost:8080/showbyIdRecipe/${id}`)
            console.log(response.data);
            setBody(response.data.body);
            console.log(body);
            setIngrList(response.data.ingredientList);
            console.log(ingrList);
            setRecipeName(response.data.name);
            console.log(recipeName);
            setFromUser(response.data.fromUser);
            console.log(fromuser);
        } catch (e) {
            console.error(e);
            console.log("Recipe doesnt exist");
        }
    }

        fetchRecipe();
    },   []);






    async function SendtoBE(e){
        e.preventDefault()
        //console.log({"Authorization": `Bearer ${localStorage.getItem('token')}`})
        try {
            const response = await axios.post(`http://localhost:8080/saverated`,
                {
                    id: id,
                    name: recipeName,
                    ingredientList: ingrList,
                    body: body,
                    pictureLink: pictureLink,
                    opinion: opinion,
                    rating: rating,
                    fromUser: fromuser
                },
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            );


            setMessage("Recipe has been send!")

        }catch(e){

            setMessage("Error sending recipe, try again later!");
            console.log(id,recipeName,ingrList,body,pictureLink,opinion,rating,fromuser)
        }
    }












    return (<div>

        <form  className={"wholeRatedRecipe"} onSubmit={SendtoBE}>

            <div className={"ratedname"}>
            <label>Name: </label>
            <input
                type="text"
                name="username"
                id="name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
            />
            </div>

            <div className={"ratedrating"}>
            <label>Rating: </label>
            <input
                type="number"
                name="rating"
                max="10"
                min="0"
                id="rating"
                onChange={(e) => setRating(e.target.value)}
            />
            </div>

        <div className={"ratedingredientList"}>
        <label  >Ingredient List: </label>
        <textarea onChange={(e) => setIngrList(e.target.value)}
                  value={ingrList}>
        </textarea>
        </div>

        <div className={"ratedBody"}>
        <label>Recipe: </label>
        <textarea onChange={(e) => setBody(e.target.value)}
        value={body}>
        </textarea>
        </div>

        <div className={"ratedOpinion"}>
        <label>Opinion: </label>
        <textarea onChange={(e) => setOpinion(e.target.value)}>
        </textarea>
        </div>
            <div className={"ratedPicLink"}>
            <p>Use designated picture host site to upload picture and retrieve link</p>

            <a href="https://imgur.com/signin"  target="_blank"   className={"piclink"}>To picture host</a>


            <label>Picture Link: </label>
            <input
                type="text"
                name="piclink"
                id="piclink"
                onChange={(e) => setPictureLink(e.target.value)}
            />
            </div>
            <h3>{message}</h3>
            <button type="submit" className={"buttonSubmit"}>Submit</button>

</form>







    </div>)

};

export default SendRated;