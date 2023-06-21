import Link from "next/link";
import styles from "./Footer.module.css";
import { UserAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
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
        <Link className={styles.white} href="/home">
          <FontAwesomeIcon icon={faHome} className={styles.footerIcon} />
        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        <Link className={styles.white} href="/search">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.footerIcon}
          />
        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        {/* To change when the message endpoint is finished */}
        <Link className={styles.white} href="/messages">
          <FontAwesomeIcon icon={faMessage} className={styles.footerIcon}/>
        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        {/* To change when the message endpoint is finished */}
        <Link className={styles.white} href="/dict">
          <FontAwesomeIcon icon={faBook} className={styles.footerIcon} />
        </Link>
      </div>
      <div className={styles.footerIconDiv}>
        <Link className={styles.white} href="/edit-profile">
          <FontAwesomeIcon icon={faUser} className={styles.footerIcon} />
        </Link>
      </div>
    </div>
  );
}
