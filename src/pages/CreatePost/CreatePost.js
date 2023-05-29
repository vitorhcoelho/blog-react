import React, { useState } from 'react'

import styles from './CreatePost.module.css'
import { useInsertDocument } from '../../hooks/useInsertDocument'

import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { insertDocument, response } = useInsertDocument("posts")

  const { user } = useAuthValue()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image)
    } catch (error) {
      setFormError("The image needs to be a URL")
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    if (!title || !image || !tags || !body) setFormError("Please complete the fields")

    if (formError) return

    console.log(formError)

    console.log(tagsArray)

    console.log({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    if (!formError) return navigate("/")
  }

  return (
    <div className={styles.create_post}>
      <h1>Create post</h1>
      <p>Write about you want</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input type="text"
            name="title"
            required
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input type="text"
            name="image"
            required
            placeholder="User password"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          <span>Content:</span>
          <textarea
            name='body'
            required
            placeholder='Insert the content post'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          >
          </textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text"
            name="tags"
            required
            placeholder="User password"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        {!response.loading && <button className="btn">Create post</button>}
        {response.loading && <button className="btn" disabled> Loading... </button>}
        {(response.error || formError) && <p className="error">{response.error || formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost