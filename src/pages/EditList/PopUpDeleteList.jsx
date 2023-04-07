import { Modal } from 'antd'
import colors from '../../utils/style/colors'
import axios from 'axios'
const { confirm } = Modal

const PopUpDeleteList = ({ listId, navigate }) => {
  const deleteList = () => {
    axios
      .delete(
        `http://${process.env.REACT_APP_IP_ADRESS}:8000/api/lists/${listId}`
      )
      .then((res) => navigate('/lists'))
      .catch((err) => console.log(err))
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure to delete this list?',
      content: (
        <p style={{ fontFamily: 'Inter' }}>
          This action is{' '}
          <span style={{ color: colors.danger, fontWeight: 500 }}>
            {' '}
            irreversible.{' '}
          </span>
        </p>
      ),
      okText: 'Yes',
      okType: 'danger',
      okButtonProps: {
        style: {
          background: colors.danger,
          borderColor: colors.danger,
          color: 'white',
        },
      },
      cancelText: 'No',
      onOk() {
        deleteList()
      },
    })
  }

  return (
    <button
      style={{
        color: 'white',
        fontWeight: 700,
      }}
      className=" text-white p-2 mx-2 border-none hover:cursor-pointer flex-1 btn-delete-list"
      onClick={showDeleteConfirm}
      type="dashed"
    >
      DELETE{' '}
    </button>
  )
}
export default PopUpDeleteList
