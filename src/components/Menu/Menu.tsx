import { useTabContext } from "../../context/TabContext";
import styles from "./Menu.module.css";

export const Menu = () => {
  const { tabs, activeTabId, setActiveTab } = useTabContext();

  return (
    <div className={styles.menuWrapper}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={tab.id === activeTabId ? styles.activeTab : styles.tabBtn}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};
