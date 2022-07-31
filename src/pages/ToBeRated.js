import {Component, useEffect, useState} from "react";
import axios from'axios'
import '../pages styles/ToBeRatedStyles.css';
import {Link} from "react-router-dom";

const ToBeRated = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes(){
            try{
                const response = await axios.get('http://localhost:8080/showAllRecipes');
                setRecipes(response.data)
                console.log(response.data);
            }catch(e){
                console.error(e);
            }


        }

        fetchRecipes();
    },[]);








    return <table className={"wholeTable"}>
        <tr className={"header"}>
            <td >ID </td>
            <td>Name</td>
            <td>From User</td>
            <td>Rate</td>
        </tr>

        {recipes.map((recipes) => {
                return <tr key={recipes.id}  className={"tableBody"}>
                    <td>{recipes.id}</td>
                    <td>{recipes.name}</td>
                    <td>{recipes.fromUser}</td>
                    <td><Link to={"/SendRated/" + recipes.id}  >Rate</Link></td>

                </tr>

            }
        )}
    </table> ;
};

export default ToBeRated;