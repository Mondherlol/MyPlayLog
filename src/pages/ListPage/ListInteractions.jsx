import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import colors from '../../utils/style/colors'
import './ListInteractions.css'
import ModalLikes from '../../components/ModalLikes/ModalLikes'

export default function ListInteractions({
  list,
  setList,
  setProgress,
  currentUser,
}) {
  console.log(list)
  const [isLiked, setIsLiked] = useState(
    list.likes.some((like) =>
      currentUser ? like.idUser === currentUser._id : false
    )
  )
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false)
  const navigate = useNavigate()
  const config = {
    method: isLiked ? 'delete' : 'post',
    url: `${process.env.REACT_APP_IP_ADRESS}/api/lists/like/${list._id}`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const handleLike = (e) => {
    if (!currentUser) navigate('/login')
    else {
      e.preventDefault()
      setProgress(10)
      const localIsLiked = isLiked
      setIsLiked((liked) => !liked)

      axios(config)
        .then((res) => {
          console.log(res)
          if (localIsLiked) {
            //If liked, remove Like
            setList((prevList) => {
              return {
                ...prevList,
                likes: prevList.likes.filter(
                  (like) => like.idUser !== currentUser._id
                ),
                likers: prevList.likers.filter(
                  (liker) => liker._id !== currentUser._id
                ),
                likesCount: prevList.likesCount - 1,
              }
            })
            //Else, add Like
          } else {
            setList((prevList) => {
              return {
                ...prevList,
                likes: [
                  ...prevList.likes,
                  { idUser: currentUser._id, _id: currentUser._id },
                ],
                likers: [...prevList.likers, currentUser],
                likesCount: prevList.likesCount + 1,
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: 'dark',
          })
        })
        .finally(() => setProgress(100))
    }
  }
  useEffect(() => {
    console.log(isLiked)
  }, [isLiked])

  return (
    <>
      <div className="flex justify-center items-center w-fit flex-col gap-1 ">
        <div className="flex flex-col gap-1 justify-center items-center">
          <button
            className={`like-button ${isLiked ? 'liked' : 'not-liked-button'}`}
            onClick={handleLike}
          >
            <div className="like-wrapper">
              <div className="ripple"></div>
              <svg className="heart" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
              </svg>
              <div className="particles" style={{ '--total-particles': 6 }}>
                <div
                  className="particle"
                  style={{ '--i': 1, '--color': '#7642F0' }}
                ></div>
                <div
                  className="particle"
                  style={{ '--i': 2, '--color': '#AFD27F' }}
                ></div>
                <div
                  className="particle"
                  style={{ '--i': 3, '--color': '#DE8F4F' }}
                ></div>
                <div
                  className="particle"
                  style={{ '--i': 4, '--color': '#D0516B' }}
                ></div>
                <div
                  className="particle"
                  style={{ '--i': 5, '--color': '#5686F2' }}
                ></div>
                <div
                  className="particle"
                  style={{ '--i': 6, '--color': '#D53EF3' }}
                ></div>
              </div>
            </div>
          </button>
          <h5
            className="text-sm font-normal cursor-pointer"
            onClick={() => setIsLikeModalOpen(true)}
          >
            {' '}
            <span style={{ color: colors.primary }}>
              {list.likesCount ? list.likesCount : 0}
            </span>{' '}
            {/* {t('likes')} */}
          </h5>
        </div>

        <div className="flex flex-col gap-1 justify-center items-center">
          <button className="comments-button" href="#" />
          <h5 className="text-sm font-normal">
            {' '}
            <span style={{ color: colors.primary }}>0</span>
          </h5>
        </div>
      </div>
      <ModalLikes
        isModalOpen={isLikeModalOpen}
        setIsModalOpen={setIsLikeModalOpen}
        likers={list.likers ? list.likers : []}
      />
    </>
  )
}
