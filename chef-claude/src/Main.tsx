import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {
    const [recipeShown, setRecipeShown] = useState(false)

    const [ingredients, setIngredients] = useState<string[]>([])

    function addNewIngredient(formData: FormData) {
        //event.preventDefault() // to avoid page refresh
        //const formData: FormData = new FormData(event.currentTarget)
        const newIngredient: any = formData.get("ingredient")
        setIngredients(prevIngs => [...prevIngs, newIngredient])
    }

    function toggleRecipe() {
        setRecipeShown(prevShown => !prevShown)
    }

    return (
        <main>
            <form action={addNewIngredient}>
                <input type="text" placeholder="e.g. oregano" aria-label="add ingredient" name="ingredient" />
                <button>+ Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList toggleRecipe={toggleRecipe} ingredients={ingredients} />}
            {recipeShown && <ClaudeRecipe />}
        </main>
    )
}