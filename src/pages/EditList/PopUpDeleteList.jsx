import { Modal } from 'antd'
import colors from '../../utils/style/colors'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const { confirm } = Modal

const PopUpDeleteList = ({ listId, navigate }) => {
  const { t } = useTranslation()
  const deleteList = () => {
    axios
      .delete(`${process.env.REACT_APP_IP_ADRESS}/api/lists/${listId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(t('list_deleted_with_success'), {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
          autoClose: 1500,
        })
        navigate('/lists')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        })
      })
  }

  const showDeleteConfirm = () => {
    confirm({
      title: `${t('are_you_sure_to_delete_this_list')} ?`,
      content: (
        <p style={{ fontFamily: 'Inter' }}>
          {t('this_action_is')}{' '}
          <span style={{ color: colors.danger, fontWeight: 500 }}>
            {' '}
            {t('irreversible')}.{' '}
          </span>
        </p>
      ),
      okText: t('yes'),
      okType: 'danger',
      okButtonProps: {
        style: {
          background: colors.danger,
          borderColor: colors.danger,
          color: 'white',
        },
      },
      cancelText: t('no'),
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
      {t('delete').toUpperCase()}{' '}
    </button>
  )
}
export default PopUpDeleteList
