/* eslint-disable jsx-a11y/img-redundant-alt */
import AceAttorneyBackground from '../../../assets/images/CardsSelection/ace_attorney_card.png'
import MonsterHunterCharacter from '../../../assets/images/CardsSelection/monster_hunter_character.png'
import MOnsterHunterBackground from '../../../assets/images/CardsSelection/monster_hunter_background.png.jpg'
import SpidermanBackground from '../../../assets/images/CardsSelection/spiderman-background.jpg'
import BotwBackground from '../../../assets/images/CardsSelection/botw-background.jpg'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function SelectionGames() {
  const cards = [
    // {
    //   background:
    //     'https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg',
    //   title:
    //     'https://ggayane.github.io/css-experiments/cards/dark_rider-title.png',
    //   character:
    //     'https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp',
    // },
    {
      background: BotwBackground,
      title:
        'https://upload.wikimedia.org/wikipedia/fr/9/90/The_Legend_of_Zelda_Breath_of_the_Wild_Logo.png',
      character:
        'https://static.wikia.nocookie.net/characterprofile/images/c/c8/BotW_Link.png',
      link: '/game/the-legend-of-zelda-breath-of-the-wild',
    },
    {
      background: SpidermanBackground,
      title:
        'https://upload.wikimedia.org/wikipedia/fr/f/f2/Marvel_Spider-Man_Logo.png',
      character:
        'https://i.pinimg.com/originals/8f/cf/d2/8fcfd2ce3f71c32ff8fa6f95ae2b1aad.png',
      link: '/search?q=spider-man',
    },
    {
      background: AceAttorneyBackground,
      title:
        'https://static.wikia.nocookie.net/aceattorney/images/5/5c/Ace_Attorney_Series_Logo.png',
      character:
        'https://www.ace-attorney.com/trilogy/images/system/main_img_sp.png',
      link: '/search?q=ace%20attorney',
    },
    {
      background: MOnsterHunterBackground,
      title:
        'https://upload.wikimedia.org/wikipedia/fr/4/40/Monster_Hunter_Rise_Logo.png',
      character: MonsterHunterCharacter,
      link: '/search?q=monster%20hunter',
    },
  ]
  const { t } = useTranslation()
  return (
    <div className="flex flex-col w-full    mt-8">
      <div>
        <h3>
          {t('selections_of_the')}{' '}
          <span className="title-highlight"> {t('month')}</span>
        </h3>{' '}
      </div>

      <div className=" grid grid-cols-2  sm:grid-cols-4 justify-center items-center mt-8 gap-4">
        {cards.map((card) => {
          return (
            <Link
              to={card.link}
              key={card.title}
              className="flex  justify-center items-center"
            >
              <div className="card">
                <div className="wrapper">
                  <img
                    alt="Background image"
                    src={card.background}
                    className="cover-image"
                  />
                </div>
                <img alt="Title logo" src={card.title} className="title" />
                <img
                  alt="Game Character image"
                  src={card.character}
                  className="character"
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
