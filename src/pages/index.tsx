import type { NextPage } from 'next'
import ChangelogsPage from './changelog/ChangelogsPage'
import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className="text-center text-bold">Index</h1>
      <ChangelogsPage/>
    </div>
  )
}

export default IndexPage
