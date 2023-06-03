import Checkbox from "../components/elements/checkbox" 
import styles from './UserInfo.module.css'

export default function UserInfo() {
  return (
    <>
    <h1>Welcome!</h1>
    <p>Tell us a little about yourself so people can find you</p>

    <form>
      <div> 
        <label htmlFor="Username"> Username: </label>
        <input type="text" id="UserName" name="Username"></input>
      </div>

      <p>Fluent: Check all that apply</p>
      <div className={styles.language}> 
       <Checkbox label="English"/>
       <Checkbox label="Spanish"/>
       <Checkbox label="German"/>
       <Checkbox label="French"/>
       <Checkbox label="Japanese"/>
       <Checkbox label="Chinese"/>
       <Checkbox label="Korean"/>
      </div>

      <p>Language you want to learn:</p>
      <div className={styles.learning}>

       <div className ={styles.learningRows}>
        <Checkbox label="English"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="Spanish"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="German"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="French"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="Japanese"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="Chinese"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>

       <div className ={styles.learningRows}>
        <Checkbox label="Korean"/>
        <Checkbox label="1"/>
        <Checkbox label="2"/>
        <Checkbox label="3"/>
       </div>
  
      </div>

      <p>Date of Birth</p>
      <input type="date"></input>

      <p>Systems</p>
      




    </form>
       
    </>
  )
}
