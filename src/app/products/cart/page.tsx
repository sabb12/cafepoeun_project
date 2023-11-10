/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./page.module.css";

export default function Cart(){

    return ( <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.title}>장바구니</div>
                <div className={`${styles.subTitleContainer} ${styles.subContainer}`}>
                    <div className={styles.subTitle}><input type="checkbox" />전체선택</div>
                    <button>선택삭제</button>
                </div>
                <hr className={styles.hr} />
                <div className={`${styles.headerContainer} ${styles.subContainer}`}>
                    <input type="checkbox" />
                    <div className={styles.deleteX}>&times;</div>
                </div>
                <div className={`${styles.bodyContainer} ${styles.subContainer}`}>
                    <img className={styles.image} src="" alt="" />
                    <div className={styles.name}>아메리카노</div>
                    <div className={styles.countContainer}>
                        <div className={styles.minusButton}>&lt;</div>
                        <input type="text" />
                        <div className={styles.plusButton}>&gt;</div>
                    </div>
                    <div className={styles.price}>4200원</div>
                </div>
                <hr className={styles.hr}/>
        </div>

    </div> )
}