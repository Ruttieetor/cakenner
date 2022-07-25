import {Component, useEffect, useState} from "react";
import axios from'axios'
import '../pages styles/HomeStyles.css';
import {Link} from "react-router-dom";


const Home = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRatedRecipes(){
            try{
                const response = await axios.get('http://localhost:8080/showAllRated');
                setRecipes(response.data)
                console.log(response.data);
            }catch(e){
                console.error(e);
            }


        }

        fetchRatedRecipes();
    },[]);



    return <div className="HomeAll">

        {
                recipes.map((recipes) => {
                return <Link to={"/Recipe/" + recipes.id}  className="recipeHome">
                    <p>{recipes.name}</p>
                    <img src={recipes.pictureLink} />
                    <p className= "smallText">Rating:</p>
                    <p className= "rating">{recipes.rating}</p>
                </Link>

            })

        }


    </div>
        ;
};


export default Home;
