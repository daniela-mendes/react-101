import { useState } from "react"

export default function Main() {
    const [ingredients, setIngredients] = useState<string[]>([])
    
    const ingredientsList = ingredients.map(ing => (
        <li className="ingredients-list-items" key={ing}>{ing}</li>
    ))

    function handleSubmit(formData: FormData) {
        //event.preventDefault() // to avoid page refresh
        //const formData: FormData = new FormData(event.currentTarget)
        const newIngredient: any = formData.get("ingredient")
        setIngredients(prevIngs => [...prevIngs, newIngredient])
    }

    return (
        <main>
            <form action={handleSubmit}>
                <input type="text" placeholder="e.g. oregano" aria-label="add ingredient" name="ingredient" />
                <button>+ Add ingredient</button>
            </form>
            {ingredients.length > 0 && <section>
                <h2>Ingredients on hand:</h2>
                <ul>
                    {ingredientsList}
                </ul>
                {ingredients.length > 3 ? <div className="get-recipe">
                    <div className="get-recipe-text">
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button>Get a recipe</button>
                </div> : null}
            </section>}
        </main>
    )
}