export default function Dice(props: { value: number}) {
    return (
        <button className="dice">{props.value}</button>
    )
}