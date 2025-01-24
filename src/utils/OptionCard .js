
import { FaCheck } from "react-icons/fa";
import styles from "../components/sidebar/sections/section2/Section2.module.css";

const OptionCard = ({ icon: Icon, title, description, isSelected, onClick }) => (
  <div
    className={`${styles.card_sec_line} ${isSelected ? styles.selectedCard : ""}`}
    onClick={onClick}
  >
    <Icon className={styles.sec_line_icon} />
    <p className={styles.sec_line_p}>{title}</p>
    <p className={styles.hover_text}>{description}</p>
    {isSelected && <FaCheck className={styles.checkIcon} />}
  </div>
);

export default OptionCard;
