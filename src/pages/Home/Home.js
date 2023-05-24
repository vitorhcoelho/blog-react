import React, { useState } from 'react'
import styles from './Home.module.css'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { Link } from 'react-router-dom'
import PostDetail from '../../components/PostDetail/PostDetail'

const Home = () => {
  const [query, setQuery] = useState()
  const { documents: posts, loading } = useFetchDocuments("posts")

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <div className={styles.home}>
      <h1>See our most recently posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text"
          placeholder='Search another tags'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='btn btn-dark'>Search</button>
      </form>

      <div>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>No posts found</p>
            <Link to={"/posts/create"} className='btn'>Create your first post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home