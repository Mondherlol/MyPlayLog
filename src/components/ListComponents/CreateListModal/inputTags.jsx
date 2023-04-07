import { useState } from 'react'
import './styles.scss'

function InputTag({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag()
    }
  }

  const addTag = () => {
    const tagValue = inputValue.trim()

    if (tagValue && !tags.includes(tagValue)) {
      if (tags.find((tag) => tag.toLowerCase() === inputValue.toLowerCase())) {
        inputValue('')
        return
      }
      setTags([...tags, tagValue])
      setInputValue('')
    }
  }

  const removeTag = (e, tagIndex) => {
    e.preventDefault()
    const newTags = [...tags]
    newTags.splice(tagIndex, 1)
    setTags(newTags)
  }

  return (
    <div className="flex flex-row ">
      <div className="tags-container">
        {tags.map((tag, index) => (
          <div className="tag" key={index}>
            <span className="tag__name">{tag}</span>
            <button
              className="tag__remove"
              onClick={(e) => removeTag(e, index)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="tag-input"
          placeholder="Add Tag"
          value={inputValue}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="bg-red-600 text-white border-none p-2 hover:bg-red-700 hover:cursor-pointer min-w-fit"
        onClick={(e) => {
          e.preventDefault()
          setTags([])
        }}
      >
        Clear tags
      </button>
    </div>
  )
}

export default InputTag
