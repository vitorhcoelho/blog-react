import React, { useState } from 'react'

import styles from './EditPost.module.css'

import { useAuthValue } from "../../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useEffect } from 'react';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { updateDocument, response } = useUpdateDocument("posts")

  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)

  const { user } = useAuthValue()

  const navigate = useNavigate()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post])


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
      editedBy: user.displayName
    })

    updateDocument(id, {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      editedBy: user.displayName
    })

    if (!formError) return navigate("/dashboard")
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h1>Editing post: {post.title}</h1>
          <p>Edit your post however you want</p>
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
            <p className={styles.preview_title}>Current image preview:</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
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
            {!response.loading && <button className="btn">Edit post</button>}
            {response.loading && <button className="btn" disabled> Loading... </button>}
            {(response.error || formError) && <p className="error">{response.error || formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost