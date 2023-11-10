import styles from "./Product.module.css";

export default function Product() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            src="https://picsum.photos/500/300?random=1"
            alt=""
            style={{ width: "180px", height: "120px" }}
          />
        </div>
        <div className={styles.purchaseCount}>구매 명</div>
        <div className={styles.name}>아메리카노</div>
        <div className={styles.price}>￦10_000</div>
        <div className={styles.buttonsContainer}>
          <button>삭제</button>
          <button>수정</button>
          <button>addToCart</button>
        </div>
      </div>
    </div>
  );
}
