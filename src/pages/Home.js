import { useEffect, useState} from "react";
import axios from'axios'
import '../pages styles/HomeStyles.css';
import {Link} from "react-router-dom";



const Home = () => {

    const [recipes, setRecipes] = useState([]);


    //fetch all rated recipes
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



    return <homePage className="HomeAll">

        {
            // map all fetched recipes into tiles
                recipes.map((recipes, key) => {
                return <Link to={"/Recipe/" + recipes.id}  className="recipeHome"  key={key}>
                    <p>{recipes.name}</p>
                    <img src={recipes.pictureLink} />
                    <p className= "smallText">Rating:</p>
                    <p className= "rating">{recipes.rating}</p>
                </Link>

            })

        }
    </homePage>
        ;
};


export default Home;
