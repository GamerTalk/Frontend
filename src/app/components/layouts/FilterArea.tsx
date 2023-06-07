import styles from "./Filter.module.css"
import { User , Search} from "../../global.t";
import { useEffect, useState } from "react";
import React, { Dispatch, SetStateAction } from "react";
import Checkbox from "@/app/utils/Checkbox";
import axios from 'axios';

interface Param {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setFilterWords: React.Dispatch<React.SetStateAction<string[]>>
  filterWords: string[]
  setShowUserCard: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterArea: React.FC<Param> = ({ setUsers, setFilterWords, filterWords , setShowUserCard}) => { 
  
  const [isClick, setClick] = useState(false);

  const [selectedSystems, setSystem] = useState<string[]>([]);
  const [selectedGenres, setGenre] = useState<string[]>([]);
  const [selectedLanguage, setLanguage] = useState<string>("");

  const languages: string[] = ["English", "Spanish", "German", "French", "Japanese", "Chinese", "Korean"];
  const genres: string[] = ["shooters", "survial", "Battle Royal", "strategy","party","fighting","RPG","MMO"];
  const systems: string[] = ["PC", "Switch", "PlayStation", "Xbox"];

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => { 
    setClick(!isClick);
    setShowUserCard(false);
    // the words for filter is reset;
    setFilterWords([]);
  }
  
  const handleApply = async(event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    
    const url = "http://127.0.0.1:8000/api/filter-users/";

    const config = {
      method: 'GET',
      headers: {
        systems:JSON.stringify(selectedSystems),
        genre: JSON.stringify(selectedGenres),
        language: selectedLanguage.toLocaleLowerCase()
      }
    }

    console.log({
      systems: JSON.stringify(selectedSystems),
      genre: JSON.stringify(selectedGenres),
      language: selectedLanguage.toLocaleLowerCase()
    });

     try { 
      const response = await axios.get(url, config);
      console.log(response.data);
      const allWords: string[] = [...selectedSystems, ...selectedGenres];
      allWords.push(selectedLanguage);
      setFilterWords(allWords);
      
      setUsers(response.data);
      // user Data component will show up
      setShowUserCard(true);
      // defatult filter will show up
      setClick(!isClick);
    } catch (error) {
      console.error(error);
    }
  }

  const handleGenre = (event: { target: { name : string }; }) => {
    const { name } = event.target;
    if (selectedGenres.includes(name)) {
      setGenre((prevGenre) => prevGenre.filter((gen) => gen !== name));
    } else {
      setGenre((prevGenre) => [...prevGenre, name]);
    }
  }

  const handleSystem = (event: { target: { name : string }; }) => {
    const { name } = event.target;
    if (selectedSystems.includes(name)) {
      setSystem((prevSystem) => prevSystem.filter((sys) => sys !== name));
    } else {
      setSystem((prevSystem) => [...prevSystem, name]);
    }
  }

  const handleLanguage = (event: { target: {name:string} }) => { 
    const { name } = event.target;
    if (selectedLanguage === name) {
      setLanguage("");
    } else {
      setLanguage(name);
    }
  }

  return (
    <>
      {isClick ? (
        <div>
        <form onSubmit={handleApply}>
            <div className={styles.filterCategory}>
              <fieldset>
                {systems.map((system, key) => { 
                  const isCheckBoxChecked = selectedSystems.includes(system);
                  return (
                    <div className={styles.category}  key={key}>
                      <label>
                        <input type="checkbox" name={system} checked={isCheckBoxChecked} onChange={handleSystem} />
                        <span>{system}</span>
                      </label>
                    </div>
                  )
                })} 
              </fieldset>
            </div>

        <div className={styles.filterCategory}>
              <fieldset>
                {genres.map((genre, key) => { 
                  const isCheckBoxChecked = selectedGenres.includes(genre);
                  return (
                    <div className={styles.category} key={key} >
                     <label>
                        <input type="checkbox" name={genre} checked={isCheckBoxChecked} onChange={handleGenre} />
                        <span>{genre}</span>
                      </label>
                    </div>
                  )
                })} 
              </fieldset>
            </div>

          <div className={styles.filterCategory}>
              <fieldset>
              {languages.map((language, key) => { 
                  const isCheckBoxChecked = selectedGenres.includes(language);
                  return (
                    <div className={styles.category} key={key} >
                       <label>
                        <input type="checkbox" name={language} checked={selectedLanguage === language} onChange={handleLanguage} />
                        <span>{language}</span>
                      </label>
                    </div>
                  )
                })} 
              </fieldset>
          </div>
          
          <button type="submit">Filter</button>
        </form>
        </div>
        


      ) : (
      <div className={styles.filterArea}>
        <div className={styles.filter}>
          <button onClick={handleClick}>Filter</button>
        </div>
        {/* <div className={styles.filterWordsWrapper}> */}
              {filterWords.map((word,key) => { 
                return (
                  <div className={styles.word} key={key}>
                    <p >{word}</p>
                  </div>
                )
              })}
        {/* </div> */}
      </div>
      ) }
    </>
    )
}

export default FilterArea

  /* 
   const config = {
    method: 'GET',
    headers: {
      'uid' : 'e3mGrFMSOnTuDGz1v6pTujwVI063'
    }
  }

  const url = "http://localhost:8000/api/user-info/"
  
   useEffect(() => {
    async function getData() {
      try {
        const userData : any  = await axios.get(url, config).then((result) => result.data)
        setProfile(userData)
        setSystem(userData.user_systems)
      } 
      catch(error) {
       console.log(error)
      }
    }
    getData()
  },[uid])

  
  */