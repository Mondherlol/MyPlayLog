import { Modal } from 'antd'
import colors from '../../../utils/style/colors'
import { useState, useEffect } from 'react'

const PopUpConfirm = ({
  isConfirmCloseModalOpen,
  setIsConfirmCloseModalOpen,
  setIsModalOpen,
}) => {
  const [closed, setClosed] = useState(false)
  function closeModal() {
    setIsConfirmCloseModalOpen(false)
    setIsModalOpen(false)
    setClosed(true)
  }
  useEffect(() => {
    if (!isConfirmCloseModalOpen) setClosed(true)
    else setClosed(false)
  }, [isConfirmCloseModalOpen])

  return (
    <Modal
      title="Close without saving ?"
      open={isConfirmCloseModalOpen && !closed}
      onCancel={() => setIsConfirmCloseModalOpen(false)}
      onOk={closeModal}
      okText="Yes"
      okType="danger"
      okButtonProps={{
        style: {
          background: colors.danger,
          borderColor: colors.danger,
          color: 'white',
        },
      }}
      cancelText="No"
    ></Modal>
  )
}

export default PopUpConfirm
