import Header from "./components/Header"
import Entry from "./components/Entry"

import entries from "./data"

export default function App() {
	const journalEntries = entries.map((entry) =>
        <Entry
			key={entry.id}
            img={entry.img} 
            title={entry.title}
            country={entry.country}
            googleMapsLink={entry.googleMapsLink}
            dates={entry.dates}
            text={entry.text} // instead of the props, we could just have {...entry}
        />
    )
    return (
        <>
            <Header />
            <main className="container">
                {journalEntries}
            </main>
        </>
    )
}