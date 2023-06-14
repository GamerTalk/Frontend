import Link from "next/link";
import styles from "./Footer.module.css";
import { UserAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMagnifyingGlass, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
faUser
export default function Footer() {
  const { user } = UserAuth();

  return (
    <div className={styles.footerDiv}>
      <FontAwesomeIcon icon={faHome} className={styles.footerIcon} />
      <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.footerIcon} />
      <FontAwesomeIcon icon={faMessage} className={styles.footerIcon} />
      <FontAwesomeIcon icon={faUser} className={styles.footerIcon} />
    </div>
  );
}
