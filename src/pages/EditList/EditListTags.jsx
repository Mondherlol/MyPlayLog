import { PlusOutlined } from '@ant-design/icons'
import { Input, Space, Tag, Tooltip, ConfigProvider } from 'antd'
import { useEffect, useRef, useState } from 'react'
import colors from '../../utils/style/colors'
import { t } from 'i18next'

function EditListTags({ tags, setTags }) {
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')
  const inputRef = useRef(null)
  const editInputRef = useRef(null)

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag.tag !== removedTag.tag)
    console.log(newTags)
    setTags(newTags)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && !tags.some((tag) => tag.tag === inputValue)) {
      setTags([...tags, { tag: inputValue }])
    }
    setInputVisible(false)
    setInputValue('')
  }

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex].tag = editInputValue
    setTags(newTags)
    setEditInputIndex(-1)
    setInputValue('')
  }

  const tagInputStyle = {
    width: 78,
    verticalAlign: 'top',
  }

  const tagPlusStyle = {
    background: colors.backgroundDerivation,
    borderStyle: 'dashed',
    color: colors.primary,
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: 'white',
          fontSize: 18,
          colorInfoBorderHover: 'white',
          colorPrimaryBorderHover: 'white',
          colorPrimaryHover: 'white',
          fontFamily: 'Inter',
        },
      }}
    >
      <Space size={[0, 8]} wrap>
        <Space size={[0, 8]} wrap>
          {tags.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag.tag}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              )
            }
            const isLongTag = tag.tag.length > 20
            const tagElem = (
              <Tag
                key={tag.tag}
                closable={true}
                style={{
                  fontSize: 18,
                  fontFamily: 'Inter',
                  userSelect: 'none',
                  color: colors.backgroundDerivation,
                }}
                color="white"
                closeIcon={<span className="  font-extrabold">✕</span>}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index)
                      setEditInputValue(tag.tag)
                      e.preventDefault()
                    }
                  }}
                >
                  {isLongTag ? `${tag.tag.slice(0, 20)}...` : tag.tag}
                </span>
              </Tag>
            )
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            )
          })}
        </Space>
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
            maxLength={20}
          />
        ) : (
          <Tag style={tagPlusStyle} onClick={showInput}>
            <PlusOutlined /> {t('new_tag')}
          </Tag>
        )}
      </Space>
    </ConfigProvider>
  )
}
export default EditListTags
