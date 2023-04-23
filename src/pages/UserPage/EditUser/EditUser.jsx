import { Button, Modal, ConfigProvider, Input } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import styled from 'styled-components'
import LoadingBar from 'react-top-loading-bar'
import { useTranslation } from 'react-i18next'

import colors from '../../../utils/style/colors'
import './EditUser.scss'
import EditIcon from '../../../assets/icons/editing.png'
import BgImg from '../../../assets/images/background/bg_01.gif'
import SelectProfilePic from './SelectImages/SelectProfilePic'
import SelectCoverPic from './SelectImages/SelectCover'

const { TextArea } = Input

const Username = styled.h2`
  text-shadow: 1px 1px 2px black;
  font-weight: 800;
  z-index: 2 !important;
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
  border-radius: 9999px;
`
const EditButton = styled.button`
  background-color: rgba(15, 20, 25, 0.75);
  &:hover {
    background-color: rgba(15, 20, 25, 0.8);
    cursor: pointer;
    backdrop-filter: blur(4px);
  }
  z-index: 2;
`
export default function EditUser({
  user,
  setUser,
  isModalOpen,
  setIsModalOpen,
  setLoginData,
}) {
  const { t } = useTranslation()
  const [bio, setBio] = useState(user.bio)
  const [profilePic, setProfilePic] = useState(user.profilePic)
  const [coverPic, setCoverPic] = useState(user.coverPic)
  const [isOpenImageModal, setIsOpenImageModal] = useState(false)
  const [isOpenCoverModal, setIsOpenCoverModal] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setBio(user.bio)
    setProfilePic(user.profilePic)
    setCoverPic(user.coverPic)
  }, [user])

  const handleUpdateUser = () => {
    setProgress(10)
    const updatedUser = { ...user }
    updatedUser.profilePic = profilePic
    updatedUser.bio = bio
    updatedUser.coverPic = coverPic

    const config = {
      method: 'put',
      withCredentials: true,
      url: `${process.env.REACT_APP_IP_ADRESS}/api/user/${user._id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: updatedUser,
    }
    axios(config)
      .then((res) => {
        setProgress(100)
        setUser(updatedUser)
        setLoginData(updatedUser)
        toast.success(t('profile_updated_with_success'), {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        })
      })
    setProgress(100)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleChangeImage = () => {
    setIsOpenImageModal(true)
  }
  const handleChangeCoverPic = () => {
    setIsOpenCoverModal(true)
  }
  return (
    <>
      <Modal
        title={t('edit_your_profile')}
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ minWidth: '300px', padding: 0 }}
        className="editUserStyle"
        footer={[
          <button
            className="btn-delete-list p-2 mx-2 rounded-xl text-white border-none cursor-pointer"
            key="back"
            onClick={handleCancel}
          >
            {t('cancel')}
          </button>,
          <button
            className="p-2 mx-2 rounded-xl text-black border-none cursor-pointer"
            style={{ backgroundColor: colors.primary }}
            key="submit"
            type="primary"
            onClick={handleUpdateUser}
          >
            {t('save_profile')}
          </button>,
        ]}
      >
        <div>
          <CoverImage
            className="w-full bg-black  h-44 relative"
            style={{
              backgroundImage: `url(${user ? coverPic : ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <EditButton
              onClick={handleChangeCoverPic}
              className="absolute top-0 left-0 w-fit right-0 bottom-0 m-auto h-fit bg-transparent border-none p-3  rounded-full  "
            >
              <img src={EditIcon} alt="edit" className=" w-4" />
            </EditButton>
            <div className=" flex flex-row absolute gap-2  justify-center items-center -bottom-1/4 left-8">
              <div className="relative " style={{ zIndex: 1 }}>
                <ProfilePicture
                  alt="profilePicture"
                  className="  w-28 h-28 object-cover rounded-full  "
                  src={user ? profilePic : ''}
                />
                <EditButton
                  className="absolute top-0 left-0 w-fit right-0 bottom-0 m-auto h-fit bg-transparent border-none p-3  rounded-full "
                  onClick={handleChangeImage}
                >
                  <img src={EditIcon} alt="edit" className=" w-4" />
                </EditButton>
              </div>

              <Username className="mb-2">
                {user ? user.username : 'No user'}
              </Username>
            </div>
          </CoverImage>
        </div>
        <div className="mt-12 px-3">
          <form className="flex flex-col gap-2">
            <ConfigProvider
              theme={{
                token: {
                  fontWeightStrong: 800,
                  colorText: 'white',
                  colorBgBase: colors.backgroundDerivation,
                  colorBorder: 'white',

                  colorPrimary: colors.primary,
                  colorTextPlaceholder: 'grey',
                  fontFamily: 'Inter',
                },
              }}
            >
              {/* <Input
              showCount
              maxLength={30}
              placeholder={`${t('username')}`}
              //   value={name}
              //   onChange={onNameChange}
            /> */}
              <TextArea
                className="mb-4"
                placeholder={`Bio`}
                showCount
                maxLength={128}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </ConfigProvider>
          </form>
        </div>
      </Modal>
      <SelectProfilePic
        isOpenImageModal={isOpenImageModal}
        setIsOpenImageModal={setIsOpenImageModal}
        extras={user.googlePic}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
      />
      <SelectCoverPic
        isOpenCoverModal={isOpenCoverModal}
        setIsOpenCoverModal={setIsOpenCoverModal}
        coverPic={coverPic}
        setCoverPic={setCoverPic}
      />
    </>
  )
}
