import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styled from 'styled-components'
import PopRemoveGame from './PopRemoveGame'
const defaultPicture =
  'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover.png'

const StyledCard = styled.figure`
  margin: 7px;
  width: calc(180px - 2vw);
  @media (max-width: 768px) {
    width: calc(180px - 10vw);
  }
  cursor:grab;

  overflow: hidden;
  position:relative;
  box-shadow: 0 5px 10px rgb(0 0 0 / 80%);
  transform-origin: center top;
  transform-style: preserve-3d;
  transform: translateZ(0);
  transition: 0.3s;
  &:hover {
    box-shadow 0 8px 16px 3px rgba( #000, .6 );
    transform translateY( -3px ) scale( 1.05 );

  }
  & > img{
    width:100%;
    min-height:100%;
  }
  &:hover > figcaption{
    transform:translateY(0px);
  }
`

const StyledName = styled.figcaption`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  transition:0.28s;
  text-shadow: 1px 1px 2px black;
  padding-bottom 10px;

  margin-left:5px;
  
  transform:translateY(200px);
`

const Rank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: white;
  font-size: 3vh;
  width: 35px;
  border: 2px solid white;
  height: 35px;
  top: 3px;
  left: 3px;
  background-color: rgb(8, 7, 27, 0.7);
  border-radius: 12px;
`

export function SortableGame(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  function getCover() {
    if (props.game.cover)
      return `https://images.igdb.com/igdb/image/upload/t_cover_big/${props.game.cover.image_id}.jpg`
    else return defaultPicture
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className="relative"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <StyledCard>
        <img src={getCover()} alt={props.game.slug} />
        <StyledName>{props.game.name}</StyledName>
        {props.list.ranked && (
          <Rank>
            {/* <h1 style={{ color: props.index === 0 ? colors.primary : 'white' }}> */}
            <h1>{props.index + 1}</h1>
          </Rank>
        )}
      </StyledCard>

      <PopRemoveGame
        setList={props.setList}
        list={props.list}
        gameId={props.game.id}
        setProgress={props.setProgress}
      />
    </div>
  )
}
