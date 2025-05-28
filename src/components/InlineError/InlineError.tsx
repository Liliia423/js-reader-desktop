import styles from "./InlineError.module.css";

export const InlineError = ({ message }: { message: string }) => {
  if (!message) return null;
  return <div className={styles.error}>{message}</div>;
};
