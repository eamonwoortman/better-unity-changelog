import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'

const AboutPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>About page</h1>
      </div>
    </div>
  )
}

export default AboutPage
