import React from 'react'
import styles from "./About.module.css"
import { Link } from 'react-router-dom'


const About = () => {
  return <div className={styles.about}>
    <h1>About</h1>

    <h2>Content of about</h2>
    <p>Descritive content of about page</p>

    <Link to={"/posts/create"} className='btn'>Create post</Link>
  </div>
}

export default About