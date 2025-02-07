import { useState, useEffect } from "react"

export default function Main() {
    const [memeInfo, setMemeInfo] = useState({
        topText: "One does not simply", 
        bottomText: "Walk into Mordor", 
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState<{id: string, name: string, url: string, width: number, height: number, box_count: number, captions: number}[]>([])
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleInputChange(event: any) {
        const { name, value } = event.currentTarget
        setMemeInfo(prevMemeInfo => ({...prevMemeInfo, [name]: value}))
    }

    function getNewImage() {
        const randomIdx = Math.floor(Math.random() * allMemes.length)
        setMemeInfo(prevMeme => ({...prevMeme, imageUrl: allMemes[randomIdx].url}))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleInputChange}
                        value={memeInfo.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleInputChange}
                        value={memeInfo.bottomText}
                    />
                </label>
                <button onClick={getNewImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeInfo.imageUrl} />
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}