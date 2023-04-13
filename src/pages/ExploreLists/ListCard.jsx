import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'react-router-dom'

import colors from '../../utils/style/colors'
import { useTranslation } from 'react-i18next'

const scroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-150%);
  }
  200% {
    transform: translateX(0%);
  }
`
const ListContainer = styled.div`
  display: flex;
  min-height: 200px;

  flex-direction: column;
  min-width: 260px;
  width: 100%;
  background-color: ${colors.backgroundDerivation};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  transition: 0.1s;
  &:hover {
    transform: scale(1.01);
    // z-index: 1;
  }
  &:hover img {
    ${(props) =>
      props.gamesLength > 4
        ? css`
            animation: ${scroll} ${props.gamesLength + 2}s linear infinite;
            animation-direction: alternate;
          `
        : ''}
  }
  overflow: hidden;
  box-shadow: inset 0 3px 15px 3px #0009;
  position: relative;
`

const CoversContainer = styled.div`
  // border-top-left-radius: 16px;
  // border-top-right-radius: 16px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  background-color: rgb(83 81 126 / 21%);
  overflow: hidden;
  position: relative;
`

const Image = styled.img`
  // width: 100px;
  // height: 100px;
  // object-fit: cover;
  // flex-shrink: 0;
  // box-shadow: inset 0 3px 15px 3px #0009;
`
const Shadow = styled.div`
  box-shadow: inset 0 3px 15px 3px #0009;
`
export default function ListCard({ list }) {
  const gamesLength = list.games ? list.games.length : 0
  const { t } = useTranslation()
  return (
    <ListContainer gamesLength={gamesLength}>
      <Link className="text-white hover:text-white" to={`/list/${list._id}`}>
        <Shadow className="absolute w-full h-full" style={{ zIndex: 1 }} />
        <CoversContainer>
          {list.games.map((game) => {
            return (
              <Image
                key={'cover for' + game._id}
                alt={game.name}
                height={'150%'}
                src={
                  game.cover
                    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                    : `https://images.igdb.com/igdb/image/upload/t_cover_big/undefined.jpg`
                }
              />
            )
          })}
          <div className="flex flex-row gap-2 absolute bottom-2 right-2 ">
            <h4 className="  p-1 px-2 rounded-xl bg-yellow-600">
              {list.gamesLength} games
            </h4>
            {list.ranked && (
              <h3 className="  p-1 px-2 rounded-xl bg-[#080705]">
                {list.ranked ? 'Ranked' : 'Classique'}
              </h3>
            )}
          </div>
        </CoversContainer>
        <div className="flex flex-col p-2">
          <h2>{list.name}</h2>
          <p className="  overflow-hidden text-ellipsis whitespace-nowrap py-2 ">
            {list.description}
          </p>
          <div className="flex flex-row gap-2  w-10/12 justify-start flex-nowrap  overflow-hidden">
            {list.tags.map((tag) => {
              return (
                <h5
                  className="border-solid border-2 rounded-xl border-white  whitespace-nowrap p-1 px-2"
                  key={tag._id}
                >
                  {tag.tag}
                </h5>
              )
            })}
            <h3 className="absolute right-5">{list.likesCount} ❤</h3>
          </div>
        </div>
      </Link>
    </ListContainer>
  )
}
