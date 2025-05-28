import styles from "./FloatingMessage.module.css";

export const FloatingMessage = ({ text }: { text: string }) => {
  return <div className={styles.floatingMessage}>{text}</div>;
};
