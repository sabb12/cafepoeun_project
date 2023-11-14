"use client";

import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Product from "./components/ProductList";
import styles from "./page.module.css";

export default function HomePage() {

  return (
    <div>
      <Header logImage={"/images/cafepoeunLogo.png"} showSearch={true} showCart={true}/>
      <div className={styles.productList}>
        <Product />
      </div>
      <Footer />
    </div>
  );
}
