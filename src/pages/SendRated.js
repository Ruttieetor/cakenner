import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import '../pages styles/SendRatedStyles.css';
import {Logout} from "../Util/Logout";
import {TimeValid} from "../Util/TimeValid";
import {GetUsername} from "../Util/GetUsername";
import jwtDecode from "jwt-decode";


const SendRated = () => {

    const {id} = useParams();
    const [recipeName, setRecipeName] = useState([]);
    const [ingrList, setIngrList] = useState([]);
    const [body, setBody] = useState([]);
    const [message, setMessage] = useState([]);
    const [opinion, setOpinion] = useState([]);
    const [rating, setRating] = useState([]);
    const [pictureLink, setPictureLink] = useState([]);
    const [fromuser, setFromUser] = useState([]);
    const [picture, setPicture] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(["http://localhost:8080/images/nothing.jpg"]);
    const [admin, setAdmin] = useState(["no"]);

    useEffect(() => {

        //fetched all the data so that the admin doesn't have to copy-paste it from another window
        //it however does allow the admin to edit the text in case of unwanted aspects of writing styles.
        async function fetchRecipe() {
            try {
                const response = await axios.get(`http://localhost:8080/showbyIdRecipe/${id}`)
                //console.log(response.data);
                setBody(response.data.body);
                //console.log(body);
                setIngrList(response.data.ingredientList);
                //console.log(ingrList);
                setRecipeName(response.data.name);
                //console.log(recipeName);
                setFromUser(response.data.fromUser);
                //console.log(fromuser);
            } catch (e) {
                console.error(e);
                console.log("Recipe doesnt exist");
            }
        }

//checks if person is admin
        async function isAdmin() {
            const token = jwtDecode(localStorage.getItem('token'));
            //console.log(token.sub);
            //console.log(`http://localhost:8080/IsAdmin/${token.sub}`);
            try {
                const response = await axios.get(`http://localhost:8080/IsAdmin/${token.sub}`);
                setAdmin(response.data);
                //console.log(response.data)
            } catch (e) {
                console.error(e);
            }


        }


        isAdmin();

        fetchRecipe();
    }, []);

//posting of the image into the backend, and it will send back a link to the picture.
    async function SendtoBE(data) {


        const formData = new FormData();
        formData.append("imageFile", picture);
        //console.log(formData);

        try {
            const response = await axios.post(`http://localhost:8080/imageUpload`, formData, {
                "Content-Type": "multipart/form-data"
            });
            //console.log(response.data);
            if (response.data === 'undefined') {
                setPictureLink("http://localhost:8080/images/nothing.jpg");
                return ("http://localhost:8080/images/nothing.jpg");
            } else {
                setPictureLink(response.data);
                return (response.data);
            }


        } catch (e) {
            console.error(e);
            setMessage("Error with image!");

        }
    }

// the posting of the actual rated recipe
    async function SendToBe2(data) {
        console.log(data);
        console.log({
            id: id,
            name: recipeName,
            ingredientList: ingrList,
            body: body,
            pictureLink: data,
            opinion: opinion,
            rating: rating,
            fromUser: fromuser
        });
        const toSend = {
            id: id,
            name: recipeName,
            ingredientList: ingrList,
            body: body,
            pictureLink: data,
            opinion: opinion,
            rating: rating,
            fromUser: fromuser
        }

        try {

            await axios({

                    method: "post", url: `http://localhost:8080/saverated`, data: toSend, headers: {
                        "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}`,

                    }
                },


                setMessage("Recipe has been send!"))

        } catch (e) {

            setMessage("Error sending recipe, did you fill evreything in?");

        }

    }


    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setPicture(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

//if there is no image selected by the admin it will put a placeholder onto the data this placeholder however
    // cant be removed at the moment.
    // after this it will start the axios call to send the rated recipe to the backend
    async function Sending() {
        let data = await SendtoBE();
        if (data === undefined) {
            data = "http://localhost:8080/images/nothing.jpg";

        }
        await SendToBe2(data);
    }

    function setting(data) {
        setPictureLink(data);
        return data;
    }
// if not admin it will change the html elements to not appear
    if (admin === "yes" && localStorage.getItem('token') && TimeValid) {


        return (<div>

            <form className={"wholeRatedRecipe"} onSubmit={SendToBe2}>

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
                    <label>Ingredient List: </label>
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
                    <label><br/><br/><br/></label>
                    <input type="file"
                           className="ImageFileSelect"
                           id="pic" name="pic"
                           accept="image/jpeg" onChange={handleImageChange}/>

                </div>
                <h3>{message}</h3>

                {previewUrl && <label>
                    <p>preview:<br></br></p>
                    <img src={previewUrl} alt="preview image" className="imagePreview" width="200px" height="200px"/>
                    <p><br></br></p>
                </label>

                }

                <button type="button" onClick={Sending} className="SubmitButton">


                    Submit
                </button>

            </form>
            <label><br/><br/><br/><br/><br/></label>
        </div>)


    } else {
        return (<label><br/>ACCES DENIED</label>);
    }
    ;
};

export default SendRated;