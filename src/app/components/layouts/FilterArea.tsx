import styles from "./Filter.module.css"
import { User , Search} from "../../global.t";
import { useEffect, useState } from "react";
import React, { Dispatch, SetStateAction } from "react";
import Checkbox from "@/app/utils/Checkbox";
import axios, { AxiosRequestConfig } from 'axios';
import { log } from "console";

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

  const language: string[] = ["English", "Spanish", "German", "French", "Japanese", "Chinese", "Korean"];
  const genres: string[] = ["Shooters", "Survial", "Battle Royal", "Strategy","Party","Fighting","RPG","MMO"];
  const systems: string[] = ["PC", "Switch", "PlayStation", "Xbox"];

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => { 
    setClick(!isClick);
    setShowUserCard(false);
  }

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

  const handleApply = async(event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    
   
    const url = "http://127.0.0.1:8000/api/filter-users/";

    const config = {
      method: 'GET',
      headers: {
        systems:JSON.stringify(selectedSystems),
        genre: JSON.stringify(selectedGenres),
        language: ""
      }
    }

    console.log({
      systems: selectedSystems,
      genre: selectedGenres,
      language: selectedLanguage
    });

    try { 
      const response = await axios.get(url, config);
      console.log(response);
      setUsers(response.data);
      setShowUserCard(true);
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
    setLanguage(name);
  }

  return (
    <>
      {isClick ? (
        <div>
        <form onSubmit={handleApply}>
          <div className={styles.filterCategory}>
            {systems.map((system) => { 
              return (
                <div className={styles.category}>
                  <Checkbox label={system} name={system} onChange={handleSystem}/>
                </div>
              )
            })} 
          </div>

          <div className={styles.filterCategory}>
            
          </div>

          <div className={styles.filterCategory}>
            
            </div>
          <button type="submit">Filter</button>
        </form>
        
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