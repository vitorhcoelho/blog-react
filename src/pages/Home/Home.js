import styles from './Home.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import React, { useState } from 'react'

import PostDetail from '../../components/PostDetail/PostDetail'

const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts")

  const navigate = useNavigate()

  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query) return navigate(`/search?q=${query}`)
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
      <div className='post-list'>
        {loading && <p>Loading...</p>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>No posts found</p>
            <Link to={"/posts/create"} className='btn'>Create your first post</Link>
          </div>
        )}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home