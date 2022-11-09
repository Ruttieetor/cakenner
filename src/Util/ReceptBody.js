function RecipeBody(recipe) {

    const receptStyle = {
        borderTop: "5px solid #c7a0b8",
        borderBottom: "5px solid #c4a68a",
        borderRadius: "30px",
        backgroundColor: "#ffebf7",
        padding: "20px",
        marginTop: "10px"
    };

    return <>
        <div style={receptStyle}>
        <h2>{recipe.name}</h2>
        <h3>From: {recipe.fromUser}</h3>

        <img src={recipe.pictureLink} className={"image"}/>
        <h3> Ingredient List:</h3>
        <p>{recipe.ingredientList}</p>
        <h3> Recipe: </h3>
        <p>{recipe.body}</p>
        </div>
    </>
}


export default RecipeBody;