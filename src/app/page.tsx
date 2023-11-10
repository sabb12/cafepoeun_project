"use client";

import styles from './page.module.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default function Home() {
  return (
    <div>
      <Header logImage={"/images/cafepoeunLogo.png"}/>
      <Footer />
    </div>
  )
}
