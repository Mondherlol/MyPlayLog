import React from 'react'
import './Test.css'

export default function Test() {
  const cards = [
    {
      background:
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgb1uwytTbcknwN07Mgfmdz6uLiu4D7mhWoWut4T_CPU-BjKbw1GvUTHkttYlHi3k1T8ym_3rEqg2sQFXiguVjcM59e5btAVWWdWRNUGDpBv8kFYbvlhyWdTZMJQ3kwR3Ji7lrPgIyS1bEB7Vb2Ah4BLQ6vLSQiJkvfcLVoaLpk4wAsbt2MsEkBrlZOOQ/s1280/WhatsApp%20Image%202022-10-04%20at%2012.29.27.jpeg',
      title:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/2560px-Mario_Series_Logo.svg.png',
      character:
        'https://www.pngall.com/wp-content/uploads/2/Mario-PNG-HD-Image.png',
    },
    {
      background:
        'https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg',
      title:
        'https://ggayane.github.io/css-experiments/cards/dark_rider-title.png',
      character:
        'https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp',
    },
    {
      background:
        'https://pm1.narvii.com/6360/87417406869dfb63cf7a116621c849b4e3a46887_hq.jpg',
      title:
        'https://static.wikia.nocookie.net/aceattorney/images/5/5c/Ace_Attorney_Series_Logo.png',
      character:
        'https://www.ace-attorney.com/trilogy/images/system/main_img_sp.png',
    },
  ]
  return (
    <div className="flex flex-row">
      {cards.map((card) => {
        return (
          <div key={card.title} className="card">
            <div className="wrapper">
              <img src={card.background} className="cover-image" />
            </div>
            <img src={card.title} className="title" />
            <img src={card.character} className="character" />
          </div>
        )
      })}
    </div>
  )
}
