import Link from "next/link";
import styles from "./Footer.module.css";
import { UserAuth } from "../../context/AuthContext";

export default function Footer() {
  const { user } = UserAuth();

  return (
    <div className={styles.footerDiv}>
      <h1>I am a footer</h1>
    </div>
  );
}
