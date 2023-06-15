import Link from "next/link";
import styles from "./Footer.module.css";
import { UserAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMagnifyingGlass,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const { user } = UserAuth();

  return (
    <div className={styles.footerDiv}>
      <div className={styles.footerIconDiv}>
        <Link className={styles.black} href="/">
          <FontAwesomeIcon icon={faHome} className={styles.footerIcon} />
          <p>Home</p>
        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        <Link className={styles.black} href="/search">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.footerIcon}
          />
          <p>Search</p>
        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        {/* To change when the message endpoint is finished */}
        <Link className={styles.black} href="/"> 
          <FontAwesomeIcon icon={faMessage} className={styles.footerIcon} />
          <p>Messages</p>

        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        <Link className={styles.black} href="/edit-profile">
          <FontAwesomeIcon icon={faUser} className={styles.footerIcon} />
          <p>Profile</p>

        </Link>
      </div>
    </div>
  );
}
