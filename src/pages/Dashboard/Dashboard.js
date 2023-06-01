import React from 'react'

import styles from './Dashboard.module.css'

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { Link } from 'react-router-dom';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.id

  const { documents: posts } = useFetchDocuments("posts", null, uid)

  const { deleteDocument } = useDeleteDocument("posts")

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Manage your posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Posts are not found</p>
          <Link to="/posts/create" className='btn'>Create your first post</Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Title</span>
            <span>Actions</span>
          </div>
        </>
      )}
      {posts && posts.map((post) => (
        <div className={styles.post_row} key={post.id}>
          <h2>{post.title}</h2>
          <div className={styles.actions}>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Details</Link>
            <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Edit</Link>
            <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>Delete</button>
          </div>
        </div>))}
    </div>
  )
}

export default Dashboard