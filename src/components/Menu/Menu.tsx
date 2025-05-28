import styles from "./Menu.module.css";

export const Menu = () => {
  return (
    <div className={styles.menuWrapper}>
      <button>📖</button>
      <button>🔖</button>
      <button>📝</button>
    </div>
  );
};
