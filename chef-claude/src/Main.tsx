import { useState } from "react"

export default function Main() {
    const [ingredients, setIngredients] = useState(["Chicken", "Oregano", "Tomatoes"])
    
    const ingredientsList = ingredients.map(ing => (
        <li key={ing}>{ing}</li>
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
            <ul>
                {ingredientsList}
            </ul>
        </main>
    )
}