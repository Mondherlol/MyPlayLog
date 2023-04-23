import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'

import ProfilePics from '../../../../utils/data/ProfilePics'
import '../EditUser.scss'
import colors from '../../../../utils/style/colors'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

const CoverSelector = styled.button`
  transition-duration: 0.2s;
  border: none;
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`
const ImageCover = styled.img`
  border: ${(props) => (props.active ? `4px solid ${colors.primary}` : 'none')};
`
export default function SelectCover({
  isOpenImageModal,
  setIsOpenImageModal,
  profilePic,
  setProfilePic,
  extras,
}) {
  const { t } = useTranslation()
  const [selectedCover, setSelectedCover] = useState(profilePic)
  const handleOk = () => {
    setProfilePic(selectedCover)
    setIsOpenImageModal(false)
  }
  const handleCancel = () => {
    setIsOpenImageModal(false)
  }
  useEffect(() => {
    const isExtraExist = ProfilePics.some(
      (pic) => pic.name === 'User Google Pic'
    )
    if (extras && !isExtraExist) {
      ProfilePics.unshift({ link: extras, name: 'User Google Pic' })
    }
  }, [extras])
  return (
    <Modal
      title={t('select_a_picture')}
      open={isOpenImageModal}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ minWidth: '300px' }}
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
          className=" p-2 mx-2 rounded-xl text-black border-none cursor-pointer"
          style={{ backgroundColor: colors.primary }}
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          {t('apply')}
        </button>,
      ]}
    >
      <div className="flex flex-row flex-wrap gap-2 p-2 max-h-96 justify-center  overflow-auto  scrollbar-thumb-yellow-500 scrollbar-thin scrollbar-rounded-[50px]">
        {ProfilePics.map((cover, index) => {
          return (
            <CoverSelector className="bg-transparent  rounded-xl ">
              <ImageCover
                active={cover.link === selectedCover}
                onClick={(e) => setSelectedCover(cover.link)}
                className="w-36 h-36 object-cover rounded-xl"
                src={cover.link}
                alt="cover"
                key={`cover picture ${index}`}
              />
            </CoverSelector>
          )
        })}
      </div>
    </Modal>
  )
}
