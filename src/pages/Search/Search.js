import React from 'react'

import styles from "./Search.module.css";

import PostDetail from "../../components/PostDetail/PostDetail";
import { Link } from 'react-router-dom';

import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery';

const Search = () => {
  const query = useQuery()
  const search = query.get("q")

  const { documents: posts } = useFetchDocuments("posts", search)

  return (
    <div className={styles.search_container}>
      <h2>Searched results for: {search}</h2>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>Search do not return posts</p>
            <Link to="/" className='btn btn-dark'>Back</Link>
          </>
        )}
        {posts && posts.map((post) =>
          <PostDetail
            key={post.id}
            post={post}
          />
        )}
      </div>
    </div>
  )
}

export default Search