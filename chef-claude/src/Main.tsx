export default function Main() {
    const ingredients = ["Chicken", "Oregano", "Tomatoes"]
    
    const ingredientsList = ingredients.map(ing => (
        <li key={ing}>{ing}</li>
    ))

    function handleSubmit(event: any) {
        event.preventDefault() // to avoid page refresh
        const formData: FormData = new FormData(event.currentTarget)
        const newIngredient: any = formData.get("ingredient")
        ingredients.push(newIngredient)
        console.log(ingredients)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="e.g. oregano" aria-label="add ingredient" name="ingredient" />
                <button>+ Add ingredient</button>
            </form>
            <ul>
                {ingredientsList}
            </ul>
        </main>
    )
}