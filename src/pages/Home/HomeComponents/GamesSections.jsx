import i18next from 'i18next'
import { getReleaseDate } from './GetReleaseDates'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function GamesSections({ games, nameSection, isLoading }) {
  const { t } = useTranslation()
  return (
    <div className=" w-full">
      <div className="games">
        <h3>
          {i18next.language === 'en' ? (
            <>
              {t(nameSection)}{' '}
              <span className="title-highlight">{t('games')}</span>
            </>
          ) : (
            <>
              <span className="title-highlight">{t('games')}</span>{' '}
              {t(nameSection)}
            </>
          )}{' '}
        </h3>
        <div className="games-carousel mt-2">
          {isLoading && (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="game" key={`placeholder ${index}`}>
                  <div
                    className="game-cover loading"
                    style={{ height: '175px' }}
                  ></div>
                  <div className="game-info">
                    <p className="game-title w-full loading h-4"></p>
                    <p className="game-viewership w-2/3 loading h-3"></p>
                  </div>

                  <div className="game-categories mt-1 h-4 w-1/3  loading"></div>
                </div>
              ))}
            </>
          )}
          {games &&
            !isLoading &&
            games.map((game) => {
              return (
                <Link
                  key={`game ${game.slug}`}
                  to={`/game/${game.slug}`}
                  className="text-white hover:text-white"
                >
                  <div className="game">
                    <div className="game-cover">
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                        alt="fareeha"
                      />
                    </div>
                    <div className="game-info">
                      <p className="game-title">{game.name}</p>
                      <p className="game-viewership">
                        {getReleaseDate({ game, i18next, t })}
                      </p>
                    </div>
                    {game.genres && (
                      <div className="game-categories mt-1">
                        <span>{t(game.genres[0].slug)}</span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}
