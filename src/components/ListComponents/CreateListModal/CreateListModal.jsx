import { Modal, Radio, Input, Button } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import TagInput from './inputTags'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ConfigProvider } from 'antd'
import { toast } from 'react-toastify'

import './CreateListModal.css'
import colors from '../../../utils/style/colors'
const { TextArea } = Input

export default function CreateListModal({
  isModalOpen,
  setIsModalOpen,
  redirectEdit = false,
  setListCreated = null,
}) {
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isRanked, setIsRanked] = useState(false)
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleCreate = () => {
    const newList = JSON.stringify({
      name: name,
      idOwner: 'Mondher',
      public: isPublic,
      ranked: isRanked,
      description: description,
      tags: tags.map((tag) => ({ tag: tag })),
    })

    var config = {
      method: 'post',
      withCredentials: true,
      url: `${process.env.REACT_APP_IP_ADRESS}/api/lists/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: newList,
    }
    axios(config)
      .then((res) => {
        !redirectEdit &&
          toast.success('List created with success', {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: 'dark',
            autoClose: 1000,
          })
        redirectEdit && redirectToEdit(res.data.listCreated._id)
        setListCreated !== null && setListCreated(res.data.listCreated)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: 'dark',
        })
      })
      .finally(() => setIsModalOpen(false))
  }

  const redirectToEdit = (listId) => {
    navigate(`/list/${listId}/edit`)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onNameChange = (e) => {
    setName(e.target.value)
  }
  const onPublicChange = (e) => {
    setIsPublic(e.target.value === 'public')
  }
  const onRankedChange = (e) => {
    setIsRanked(e.target.value === 'ranked')
  }
  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  return (
    <Modal
      title={t('create_new_list')}
      open={isModalOpen}
      onCancel={handleCancel}
      style={{ minWidth: '300px' }}
      className="createListStyle"
      footer={[
        <button
          className="btn-delete-list p-2 mx-2 rounded-xl text-white border-none cursor-pointer"
          key="back"
          onClick={handleCancel}
        >
          {t('cancel')}
        </button>,
        <button
          className="btn-save-list p-2 mx-2 rounded-xl text-black border-none cursor-pointer"
          style={{ backgroundColor: colors.primary }}
          key="submit"
          type="primary"
          onClick={handleCreate}
        >
          {t('create')}
        </button>,
      ]}
    >
      <div>
        <form className="flex flex-col gap-2">
          <label>{t('name_your_list')}</label>
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
            <Input
              showCount
              maxLength={100}
              placeholder={`${t('best_fighting_games')}...`}
              value={name}
              onChange={onNameChange}
            />

            <div className="flex flex-row justify-between gap-10">
              <div className="flex flex-col">
                <label>{t('visibility')}</label>
                <Radio.Group
                  defaultValue="private"
                  buttonStyle="solid"
                  onChange={onPublicChange}
                >
                  <Radio.Button
                    style={{ color: isPublic ? 'black' : 'white' }}
                    value="public"
                  >
                    {t('public')}
                  </Radio.Button>
                  <Radio.Button
                    style={{ color: !isPublic ? 'black' : 'white' }}
                    value="private"
                  >
                    {t('private')}
                  </Radio.Button>
                </Radio.Group>
              </div>

              <div className="flex flex-col">
                <label>{t('type')}</label>
                <Radio.Group
                  defaultValue="classic"
                  buttonStyle="solid"
                  onChange={onRankedChange}
                >
                  <Radio.Button
                    style={{ color: !isRanked ? 'black' : 'white' }}
                    value="classic"
                  >
                    {t('classic')}
                  </Radio.Button>
                  <Radio.Button
                    value="ranked"
                    style={{ color: isRanked ? 'black' : 'white' }}
                  >
                    {t('top')}
                  </Radio.Button>
                </Radio.Group>
              </div>
            </div>

            <TextArea
              className="mb-4"
              placeholder={`${t('describe_your_list_in_some_words')}...`}
              showCount
              maxLength={300}
              value={description}
              onChange={onDescriptionChange}
            />
            <TagInput tags={tags} setTags={setTags} />
          </ConfigProvider>
        </form>
      </div>
    </Modal>
  )
}
