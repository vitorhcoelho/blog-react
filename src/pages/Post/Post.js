import React from 'react'

import styles from "./Post.module.css";
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
  const { id } = useParams()
  //another way
  // const { document: post } = useFetchDocument("posts", id)
  const { document } = useFetchDocument("posts", id)

  const post = document;

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt="" />
          <p>{post.body}</p>
        </>
      )}
    </div>
  )
}

export default Post