import { Modal, Radio, Input, Button } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import TagInput from './inputTags'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input

export default function CreateListModal({
  isModalOpen,
  setIsModalOpen,
  redirectEdit = false,
  setListCreated = null,
}) {
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [isRanked, setIsRanked] = useState(false)
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
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
      url: `${process.env.REACT_APP_IP_ADRESS}/api/lists/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: newList,
    }
    axios(config)
      .then((res) => {
        redirectEdit && redirectToEdit(res.data.listCreated._id)
        console.log(res.data)
        setListCreated !== null && setListCreated(res.data.listCreated)
      })
      .catch((err) => console.log(err))
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
      title="Create new List"
      open={isModalOpen}
      onCancel={handleCancel}
      style={{ minWidth: '300px' }}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleCreate}>
          Create
        </Button>,
      ]}
    >
      <div>
        <form className="flex flex-col gap-2">
          <label>Name your list</label>
          <Input
            showCount
            maxLength={100}
            placeholder="Best fighting games..."
            value={name}
            onChange={onNameChange}
          />

          <div className="flex flex-row justify-between gap-10">
            <div className="flex flex-col">
              <label>VISIBILITY</label>
              <Radio.Group
                defaultValue="private"
                buttonStyle="solid"
                onChange={onPublicChange}
              >
                <Radio.Button value="public">Public</Radio.Button>
                <Radio.Button value="private">Private</Radio.Button>
              </Radio.Group>
            </div>

            <div className="flex flex-col">
              <label>TYPE</label>
              <Radio.Group
                defaultValue="classic"
                buttonStyle="solid"
                onChange={onRankedChange}
              >
                <Radio.Button value="classic">Classique</Radio.Button>
                <Radio.Button value="ranked">Ordonnée</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <TextArea
            className="mb-4"
            placeholder="Describe your list in some words..."
            showCount
            maxLength={300}
            value={description}
            onChange={onDescriptionChange}
          />
          <TagInput tags={tags} setTags={setTags} />
        </form>
      </div>
    </Modal>
  )
}
