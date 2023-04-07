/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

import poster from '../../assets/images/poster.png'

export default function GameCard() {
  return (
    <div>
      <img alt="default-image" className=" w-12 h-20 rounded-lg" src={poster} />
    </div>
  )
}
