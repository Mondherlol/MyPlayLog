import Carousel from 'better-react-carousel'
import { useNavigate } from 'react-router-dom'
function SimilarGames({ games }) {
  const navigate = useNavigate()

  return (
    <div style={{ width: 350 }}>
      <Carousel cols={3} rows={1} gap={5} loop>
        {games.map((game) => {
          return (
            <Carousel.Item key={game.id}>
              {/* <h1> {game.name}</h1> */}
              <img
                draggable="false"
                className=" cursor-pointer hover:border-xl hover:border-solid "
                onClick={() => {
                  navigate('/game/' + game.slug)
                }}
                width="100%"
                src={
                  game.cover
                    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                    : 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png'
                }
                alt={game.name}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}

export default SimilarGames
