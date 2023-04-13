import React from 'react'

const UserCardPlaceHolder = () => {
  return (
    <div className="w-44 h-52 rounded-md relative animate-pulse " style={{backgroundColor:'rgb(255,255,255,0.1)'}} >
        {/* <div className='w-44 h-52 rounded-md' > */}
        <div className="absolute top-2 left-4 w-36 h-36 rounded-full " style={{backgroundColor:'rgb(255,255,255,0.1)'}} />
        <h1 className="absolute mt-40 ml-3  rounded w-16 h-4" style={{backgroundColor:'rgb(255,255,255,0.1)'}} />
        {/* </div> */}
      
    </div>
  )
}

export default UserCardPlaceHolder
