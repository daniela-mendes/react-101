export default function IngredientsList(props: any) {
    const ingredientsList = props.ingredients.map((ing: string) => (
        <li className="ingredients-list-items" key={ing}>{ing}</li>
    ))

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul>{ingredientsList}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe">
                <div ref={props.ref} className="get-recipe-text">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
}