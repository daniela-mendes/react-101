export default function Entry(props: {img: {src: string, alt: string}, country: string, googleMapsLink: string, title: string, dates: string, text: string}) {
    return (
        <div className="entry">
            <img src={props.img.src} alt={props.img.alt} />
            
            <div className="body">
                <div className="entry-header">
                    <div className="country">
                        <img src="/src/assets/marker.png" alt="location pin" />
                        <span>{props.country}</span>
                    </div>
                    <a href={props.googleMapsLink}>View on Google Maps</a>
                </div>
                
                <span className="entry-title">{props.title}</span>
                
                <span className="entry-date">{props.dates}</span>
                
                <span className="entry-text">{props.text}</span>
            </div>
        </div>
    )
}