import { Post } from "@/app/global.t";
import styles from "../../home/home.module.css"

export default function PostCard(props:any) {
  const post: Post = props.post
  const messageDate = new Date(post.time_of_message);
  // Format the date and time
  const formattedDate = messageDate.toLocaleDateString(); // Change the date format as desired
  const formattedTime = messageDate.toLocaleTimeString(); // Change the time format as desired

  return (
    <div className={styles.post} key={post.id}>
      <div className={styles.pic}>Picture</div>
      <div className={styles.time}>
        {formattedDate} {formattedTime}
      </div>
      <div className={styles.user}>{post.sender_data.username}</div>
      <div className={styles.message}>
        {post.message.split("\n").map((e: string, index: number) => (
          <p key={index}>{e}</p>
        ))}
      </div>
    </div>
  );
}