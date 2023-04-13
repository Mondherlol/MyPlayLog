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
import ListCard from '../ExploreLists/ListCard'
import BgImg from '../../assets/images/background/bg_02.gif'
import UserLists from './UserLists/UserLists'
const ProfileWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const Username = styled.h2`
  text-shadow: 1px 1px 2px black;
  font-weight: 800;
  font-size: 25px;
`
const CoverImage = styled.div`
&:after {
  content:"";
  position:absolute;
  height:100%;
  width:100%;
  bottom:0px;
  // transform:scale(.9);
  box-shadow: 0px 5px 8px #000000;
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
  const { loginData } = useContext(LoginData)

  const [user, setUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    setProgress(20)
    axios
      .get(`${process.env.REACT_APP_IP_ADRESS}/api/user/${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
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
    <ProfileWrapper>
      <CoverImage
        className="w-full bg-black  h-44 relative"
        style={{
          backgroundImage: `url(${BgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className=" flex flex-row absolute gap-2 justify-center items-center -bottom-1/4 left-8">
          <ProfilePicture
            alt="profilePicture"
            className="  w-28 rounded-full z-10 "
            src={user ? user.profilePic : ''}
          />
          <div>
            <Username className="mb-2">
              {user ? user.username : 'No user'}
            </Username>
          </div>
        </div>
      </CoverImage>
      <UserLists userId={userId} />
    </ProfileWrapper>
  )
}
