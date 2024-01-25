import Link from "next/link";
import styles from "../styles/Home.module.css";

const Category = () => {
  return (
    <section className={styles.category}>
      <div className={styles.women}>
        <Link href={`/products/women`}>
          <p className={`${styles.categoryLabel} jost`}>Women's Collection</p>
        </Link>
      </div>
      <div className={styles.categoryRightContainer}>
        <h2 className="jost">Set your wardrobe with our amazing selection!</h2>
        <h4 className="jost">
          Elevate your style on and off the field with our fashionable
          sportswear. 40% Off for 15-30 July only.
        </h4>
        <div className={styles.categoryRight}>
          <div className={styles.children}>
            <Link href={`/products/children`}>
              <p className={`${styles.categoryLabel} jost`}>kid's Collection</p>
            </Link>
          </div>
          <div className={styles.men}>
            <Link href={`/products/men`}>
              <p className={`${styles.categoryLabel} jost`}>Men's Collection</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
