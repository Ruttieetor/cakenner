function RatingBody(recipe) {

    const mystyle = {
        borderTop: "5px solid #c7a0b8",
        borderBottom: "5px solid #c4a68a",
        borderRadius: "30px",
        backgroundColor: "#ffebf7",
        padding: "20px",
        marginTop: "10px"
    };
    return <>
        <div style={mystyle}>
            <h3>Opinion:</h3>
            <p>{recipe.opinion}</p>
            <h3> Rating: {recipe.rating}</h3>
        </div>
    </>
}


export default RatingBody;