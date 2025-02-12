export default function Dice(props: { id: number, value: number, isHeld: boolean, toggleHold: any}) {
    return (
        <button 
            className="dice" 
            style={{"backgroundColor": props.isHeld ? "#59E391" : ""}}
            onClick={() => props.toggleHold(props.id)}
            aria-label={`Die with value ${props.value}. Die is currently ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}
        >{props.value}</button>
    )
}