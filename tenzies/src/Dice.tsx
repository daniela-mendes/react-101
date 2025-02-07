export default function Dice(props: { id: number, value: number, isHeld: boolean, toggleHold: any}) {
    return (
        <button 
            className="dice" 
            style={{"backgroundColor": props.isHeld ? "#59E391" : ""}}
            onClick={() => props.toggleHold(props.id)}
        >{props.value}</button>
    )
}