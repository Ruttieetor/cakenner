import {Component, useEffect, useState} from "react";
import axios from'axios';
import '../pages styles/RecipesStyles.css';
import {Link} from "react-router-dom";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    //fetched all recipes and maps these into a table


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



    return (

        <table className={"MainTable"}>
        <tbody>
        <tr className={"TableHead"}>
            <td className={"id"}>ID </td>
            <td>Name</td>
            <td>Opinion</td>
            <td>From User</td>
            <td>Rating</td>
            <td>Go</td>
        </tr>

        {recipes.map((recipes) => {
        return <tr key={recipes.id} className={"TableCell"}>
            <td>{recipes.id}</td>
            <td>{recipes.name}</td>
            <td>{recipes.opinion}</td>
            <td>{recipes.fromUser}</td>
            <td>{recipes.rating}</td>
            <td><Link to={"/Recipe/" + recipes.id}  className="recipeLink" >Go</Link></td>

        </tr>

        }
        )}
    </tbody>

        </table>)

};

export default Recipes;
