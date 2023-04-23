import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'
import { useTranslation } from 'react-i18next'
import { LoginData } from '../../Helper/Context'
import { Loader } from '../../utils/Atoms'
import { toast } from 'react-toastify'
import colors from '../../utils/style/colors'
import UserTabs from './UserTabs/UserTabs'
import EditUserModal from './EditUser/EditUser'
const ProfileWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Username = styled.h2`
  text-shadow: 1px 1px 2px black;
  font-weight: 800;
  z-index: 2 !important;
  font-size: 25px;
`

const CoverImage = styled.div`
  @media (min-width: 500px) {
    height: 600px;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    &:after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      bottom: 0px;
    }
    &:before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      bottom: 0px;
      background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(0, 33, 38, 0)),
        to(${colors.background})
      );

      background-image: linear-gradient(
        -180deg,
        rgba(0, 33, 38, 0),
        ${colors.background}
      );
    }

    &:after {
      background: radial-gradient(
        circle,
        rgba(0, 33, 38, 0) 0,
        ${colors.background} 100%
      );
    }
  }
`
const CoverImageMobile = styled.div`
  @media (max-width: 499px) {
    &:after {
      transform: scale(0.9);
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      bottom: 0px;
      box-shadow: 0px 5px 8px #000000;
    }
    background-image: ${(props) =>
      props.coverPic ? `url(${props.coverPic})` : 'none'};
    background-position: center;
    background-size: cover;
  }
`
const ProfilePicture = styled.img`
  border: 1px solid black;
  box-shadow: 0px 5px 8px #000000;
`

export default function UserPage() {
  const { userId } = useParams()
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const { loginData, setLoginData } = useContext(LoginData)
  const [userLists, setUserLists] = useState([])
  const [totalUserLists, setTotalUserLists] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [user, setUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    setProgress(20)
    //get user datas
    axios
      .get(`${process.env.REACT_APP_IP_ADRESS}/api/user/${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.user)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        console.log(error)
        setLoading(false)
        navigate('/error')
      })
      .finally(() => setProgress(100))
    //get user lists
    axios
      .get(
        `${process.env.REACT_APP_IP_ADRESS}/api/lists?idOwner=${userId}&sort=createdAt&order=desc&limit=4`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUserLists(res.data.lists)
        setTotalUserLists(res.data.totalLists)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        })
      })
  }, [userId])

  if (loading) {
    return (
      <ProfileWrapper className="flex w-full justify-center items-center">
        <LoadingBar
          color={colors.primary}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Loader />
      </ProfileWrapper>
    )
  }
  return (
    <>
      <ProfileWrapper className="relative" style={{ zIndex: 2 }}>
        <CoverImage
          style={{
            zIndex: -1,
            backgroundImage: `url(${user.coverPic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <CoverImageMobile
          coverPic={user.coverPic}
          className="w-full h-44 relative"
        >
          <div className=" flex flex-row absolute gap-2  justify-center items-center -bottom-1/4 left-8">
            <ProfilePicture
              alt="profilePicture"
              className="  w-28 rounded-full h-28 object-cover  "
              style={{ zIndex: 1 }}
              src={user ? user.profilePic : ''}
            />
            <Username className="mb-2">
              {user ? user.username : 'No user'}
            </Username>
            {loginData && loginData._id === userId && (
              <button
                style={{ zIndex: 2 }}
                onClick={() => setIsModalOpen(true)}
                className="  p-2 mx-2 mb-4 border-none hover:cursor-pointer bg-[#FDC500] hover:bg-[#FFD12E] "
              >
                {t('edit')}
              </button>
            )}
          </div>
        </CoverImageMobile>
        <div className=" ml-36  mt-2 w-fit  h-12">
          <p>
            <span style={{ color: colors.primary }}>0</span> {t('followers')} |{' '}
            <span style={{ color: colors.primary }}>0</span> {t('following')}
          </p>
        </div>
        <UserTabs user={user} userLists={userLists} />
      </ProfileWrapper>

      <EditUserModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        user={user}
        setUser={setUser}
        setLoginData={setLoginData}
      />
    </>
  )
}
