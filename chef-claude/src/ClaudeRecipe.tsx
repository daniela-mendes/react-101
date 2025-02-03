import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe(props: {recipe: string}) {
    return (
        <section>
            <h2>Suggested recipe:</h2>
            <ReactMarkdown className="suggested-recipe">{props.recipe}</ReactMarkdown>
        </section>
    )
}