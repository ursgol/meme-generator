import React from "react"
//import memesData from "../memesData.js"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(function(){
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data))
        //console.log("Effect function ran")
      }, [])

    function getMemeImage() {
        const memesArray = allMemes.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevmeme => {
            return {
                ...prevmeme,
                [name]: value
            }
        })
    }
    
    return (
        <main>
            <div class="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                    name ="topText"
                    value = {meme.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChange}
                    name ="bottomText"
                    value = {meme.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
            </div>

            <div className="meme">
            <img src={meme.randomImage} className="meme--image" alt="" />

                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text down">{meme.bottomText}</h2>
            </div>
        </main>
    )
}