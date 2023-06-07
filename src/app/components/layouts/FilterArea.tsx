import styles from "./Filter.module.css"
import { User } from "../../global.t";
import { useEffect, useState } from "react";

interface Param {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setFilterWords: React.Dispatch<React.SetStateAction<string[]>>
  filterWords: string[]
}

const FilterArea: React.FC<Param> = ({ setUsers, setFilterWords, filterWords }) => { 
  
  const [isClick, setClick] = useState(false);
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => { 
    setClick(!isClick);
  }

  return (
    <>
      {isClick ? (
        <div>
         
        </div>
      ) : (
      <div className={styles.filterArea}>
        <div className={styles.filter}>
          <button onClick={handleClick}>Filter</button>
        </div>
          <div className={styles.filterWordsWrapper}>
            {filterWords.map(word => { 
              return (
                <div className={styles.word}>
                  <p>word</p>
                </div>
              )
            })}
        </div>
      </div>
       ) }
    </>
    )
}

export default FilterArea