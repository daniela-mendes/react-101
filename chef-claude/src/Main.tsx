import { useState, useRef, useEffect } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "./ai"

export default function Main() {
    const [recipe, setRecipe] = useState<string>("")

    const [ingredients, setIngredients] = useState<string[]>([])

    const recipeSection = useRef<HTMLElement>(null)

    useEffect(() => {
        if (recipe.length > 0) recipeSection.current?.scrollIntoView({behavior: "smooth"})
    }, [recipe])

    function addNewIngredient(formData: FormData) {
        //event.preventDefault() // to avoid page refresh
        //const formData: FormData = new FormData(event.currentTarget)
        const newIngredient: any = formData.get("ingredient")
        setIngredients(prevIngs => [...prevIngs, newIngredient])
    }

    function getRecipe() {
        getRecipeFromMistral(ingredients).then((recipe) => {
            setRecipe(recipe ?? "Sorry, I couldn't generate a recipe.")
        })
    }

    return (
        <main>
            <form action={addNewIngredient}>
                <input type="text" placeholder="e.g. oregano" aria-label="add ingredient" name="ingredient" />
                <button>+ Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ref={recipeSection} getRecipe={getRecipe} ingredients={ingredients} />}
            {recipe.length > 0 && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}