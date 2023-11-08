import styles from "./Product.module.css";

// Product컴포는드에 size라는 이름으로 string타입에 "productList" | "cart"
type Props = {
  onClick?: () => void;
  onDelete?: () => void;
  size: "productList" | "cart";
  showCategory: boolean;
  removable: boolean;
  product: {
    name: string;
    price: number;
    category: string;
    imageUrl: string;
  };
};

export default function Product(props: Props) {
  const { size, product, removable, showCategory, onClick, onDelete } = props;

  return (
    <div className={`${styles[size]} ${styles.container}`} onClick={onClick}>
      {removable && (
        <div className={styles.deleteButton} onClick={onDelete}>
          &times;
        </div>
      )}
      <div className={styles.image}>
        <img src={product.imageUrl} alt="" />
      </div>
      <div className={styles.detailContainer}>
        {showCategory && <div>{product.category}</div>}
        <div>{product.price}</div>
        <div>{product.name}</div>
      </div>
    </div>
  );
}
