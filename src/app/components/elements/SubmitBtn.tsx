import styles from "./SubmitBtn.module.css"

interface Prpos {
  word: string
};

const Button = (props:Prpos) => { 
  const { word } = props;

  return (
    <button id={styles.btn} type="submit">{word}</button>
  );
}

export default Button;