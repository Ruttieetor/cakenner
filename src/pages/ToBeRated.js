import { useEffect, useState} from "react";
import axios from 'axios'
import '../pages styles/ToBeRatedStyles.css';
import {Link} from "react-router-dom";
import {TimeValid} from "../Util/TimeValid";
import jwtDecode from "jwt-decode";

const ToBeRated = () => {

    const [recipes, setRecipes] = useState([]);
    const [admin, setAdmin] = useState(["no"]);
//almost the same as the fetch all rated recipe only this time the list of to be rated recipes

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.get('http://localhost:8080/showAllRecipes');
                setRecipes(response.data)
                //console.log(response.data);
            } catch (e) {
                console.error(e);
            }


        }
        async function isAdmin() {
            const token = jwtDecode(localStorage.getItem('token'));
            try {
                const response = await axios.get(`http://localhost:8080/IsAdmin/${token.sub}`);
                setAdmin(response.data);
                //console.log(response.data)
            } catch (e) {
                console.error(e);
            }


        }
        isAdmin();
        fetchRecipes();
    }, []);
//checks if user is admin otherwhise it won't show html elements
    if (admin === "yes" && localStorage.getItem('token') && TimeValid) {


        return <table className={"wholeTable"}>
            <tbody>
            <tr className={"header"}>
                <td>ID</td>
                <td>Name</td>
                <td>From User</td>
                <td>Rate</td>
            </tr>

            {recipes.map((recipes) => {
                    return <tr key={recipes.id} className={"tableBody"}>
                        <td>{recipes.id}</td>
                        <td>{recipes.name}</td>
                        <td>{recipes.fromUser}</td>
                        <td><Link to={"/SendRated/" + recipes.id}>Rate</Link></td>

                    </tr>

                }
            )}
            </tbody>

        </table>;

    } else {
        return (<label><br/>ACCES DENIED</label>)
    }
};

export default ToBeRated;