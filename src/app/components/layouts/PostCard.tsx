import { Post } from "@/app/global.t";
import styles from "../../home/home.module.css"

export default function PostCard(props:any) {
  const post: Post = props.post
  const setShowProfilePage: Function = props.setShowProfilePage;
  const setSingleUser: Function = props.setSingleUser;

  const messageDate = new Date(post.time_of_message);
  // Format the date and time
  const formattedDate = messageDate.toLocaleDateString(); // Change the date format as desired
  const formattedTime = messageDate.toLocaleTimeString(); // Change the time format as desired
  
  const singleUserView = () => {
    setSingleUser(post.sender_data);
    setShowProfilePage(true);
  }
  return (
    <div className={styles.post} key={post.id} onClick={singleUserView}>
      <div className={styles.info_contents}>
        <div className={styles.pic}>
          <img src={post.sender_data.profile_picture_url} alt="" className={styles.image}/>
        </div>
        <div className={styles.userAndDate}>
          <div className={styles.user}>{post.sender_data.username}</div>
          <div className={styles.time}>
            {formattedDate} {formattedTime}
          </div>

        </div>

      </div>
      <div className={styles.message}>
        {post.message.split("\n").map((e: string, index: number) => (
          <p key={index}>{e}</p>
        ))}
      </div>
    </div>
  );
}