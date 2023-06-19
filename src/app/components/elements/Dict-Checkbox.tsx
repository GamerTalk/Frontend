import styles from '../../dict/dict.module.css'

interface Param {
  front : string,
  back: string
}

const DictCheckbox: React.FC<Param> = ({ front, back})  => {

  return (
    <div className={styles.langBox}>
    <input type="checkbox"></input>
    <div className={styles.front}><label>{front}</label></div>
    <div className={styles.back}><label>{back}</label></div>
    </div>
  )
}


export default DictCheckbox