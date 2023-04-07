import { Modal } from 'antd'
import { Link } from 'react-router-dom'

export default function ModalLikes({ likes, isModalOpen, setIsModalOpen }) {
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <Modal
      title="Users who liked"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="w-full flex flex-col overflow-y-auto h-72">
        {likes.map((like) => {
          return (
            <Link
              className="w-full p-4 border-solid border-gray-700 rounded-lg"
              to="/"
              key={like._id}
            >
              {like.idUser}{' '}
            </Link>
          )
        })}
      </div>
    </Modal>
  )
}
