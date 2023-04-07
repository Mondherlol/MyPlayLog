import React, { Suspense } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'
import Test from '../../components/Test/Test'

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

function HomePage() {
  const { t } = useTranslation()
  document.title = 'MyPlayLog - ' + t('home')
  return (
    <HomeWrapper>
      {/* //Suspense sert à attendre que l'appel API s'effectue avant de rendre le composant  */}
      <Suspense fallback="loading">
        <div className=" text-white font-bold text-base md:text-4xl text-center mt-auto mb-0">
          <h1>{t('welcome_to_home_page')}</h1>
        </div>
        <div className="   flex  flex-row justify-center items-center flex-wrap mx-auto mb-auto gap-2 mt-6 ">
          <Link to="/game/super-mario-galaxy">
            <img
              className="w-24  h-42"
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co21ro.jpg"
              alt="Mario Galaxy"
            />
          </Link>
          <Link to="/game/cthulhu-saves-the-world-super-hyper-enhanced-championship-edition-alpha-diamond-dx-plus-alpha-fes-hd-premium-enhanced-game-of-the-year-collectors-edition-without-avatars">
            <img
              className="w-24  h-42 "
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png"
              alt="Long jeu"
            />
          </Link>
          <Link to="/game/the-legend-of-zelda-tears-of-the-kingdom">
            <img
              className="w-24  h-42"
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg"
              alt="Zelda"
            />
          </Link>
          <Link to="/game/the-wolf-among-us-2">
            <img
              className="w-24  h-42 "
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co4ha1.jpg"
              alt="Wolf Among Us 2"
            />
          </Link>
          <Link to="/game/pokemon-mystery-dungeon-red-rescue-team">
            <img
              className="w-24  h-42 "
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co21em.jpg"
              alt="Wolf Among Us 2"
            />
          </Link>
          <Link to="/game/persona-5-royal">
            <img
              className="w-24  h-42 "
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1nic.jpg"
              alt="Wolf Among Us 2"
            />
          </Link>
        </div>
        <div className="w-full ">
          <Test />
        </div>
      </Suspense>
    </HomeWrapper>
  )
}
export default HomePage
