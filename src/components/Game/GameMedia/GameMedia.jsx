import { useTranslation } from 'react-i18next'
import colors from '../../../utils/style/colors'
import GameGallery from '../GameGallery/GameGallery'
import SimilarGames from '../../SimilarGames/SimilarGames'
function GameMedia({ game }) {
  const { t } = useTranslation()
  return (
    <div>
      {game.screenshots && (
        <div className="mt-2">
          <h2
            style={{ color: colors.primary }}
            className="text-center justify-center mx-auto"
          >
            {t('screenshots')}
          </h2>
          <GameGallery images={game.screenshots} />
        </div>
      )}
      {game.artworks && (
        <div className="mt-2">
          <h2
            style={{ color: colors.primary }}
            className="text-center justify-center mx-auto"
          >
            Artworks
          </h2>
          <GameGallery images={game.artworks} />
        </div>
      )}
      {game.similar_games && (
        <div className="mt-2">
          <h2
            style={{ color: colors.primary }}
            className="text-center justify-center mx-auto"
          >
            {t('similar_games')}
          </h2>
          <SimilarGames games={game.similar_games} />
        </div>
      )}
    </div>
  )
}
export default GameMedia
