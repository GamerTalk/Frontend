// @ts-nocheck

"use client"

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import DictCheckbox from '../components/elements/Dict-Checkbox'
import Add from '../components/elements/dict-add/page'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext'
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Dict() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cards, setCards] = useState<any>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [timer, setTimer] = useState(false)
  const {uid} = UserAuth();

  const config = {
    method: 'GET',
    headers: {
      'uid' : uid
    }
  }

  /*
  const config = useMemo(() => {
    return {
      method: 'GET',
      headers: {
        'uid': uid
      }
    };
  }, [uid]); // Only recreate the config object when uid changes
  */

  const getURL = process.env.NEXT_PUBLIC_API_URL + "/api/get-flashcards/"
  const deleteURL = process.env.NEXT_PUBLIC_API_URL + "/api/delete-flashcard/"

  const getData = async () => {
  //const getData = useCallback(async () => {
    try {
      if (uid) {
        const userData = await axios.get(getURL, config).then((result) => result.data);
        setCards(userData);
      } else {
        console.log('fail');
      }
    } catch (error) {
      console.log(error);
    }
  };
 // }, [uid, getURL, config]); // List dependencies that getData relies on

  const deleteData = async () => {
    try {
      if (uid) {
        await Promise.all(
          selectedCards.map(async (card) => {
            const requestData = {
              user_uid: uid,
              card_id: card
            };
            await axios.delete(deleteURL, { data: requestData, headers: { uid } });
          })
        );
        await getData(); // Refresh the data after deleting the cards
      } else {
        // console.log('fail');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getData();
  }, [uid]);
  //}, [uid, getData]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = async () => {
    setIsPopupOpen(false);
    await getData();
  };

  const handleDeleteCards = (event: { target: { name: string }; }) => {
    const {  name } = event.target;
    if (selectedCards.includes(name)) {
      // If card is already selected, remove it from the array
      setSelectedCards((prevCards) => prevCards.filter((card) => card !== name));
    } else {
      // If card is not selected, add it to the array
      setSelectedCards((prevCards) => [...prevCards, name]);
    }
  }

  useEffect(() => {
    // console.log(selectedCards)
  },[selectedCards])

  useEffect(() => {
    setTimeout(() => {
      setTimer(true);
    }, 1000);
  }, []);

  useEffect(() => {
    // console.log(cards)
  }, [cards]);


  function myFunction() {
    if (confirm("Are you sure you want to delete these cards?") === true) {
      deleteData()
    } 
  }

  const downloadCSV = () => {
    let csvData = [];
    if (selectedCards.length > 0) {
      csvData = cards
        .filter((card) => selectedCards.includes(String(card.id)))
        .map((card) => [card.front, card.back]);
    } else {
      csvData = cards.reverse().map((card) => [card.front, card.back]);
    }
  
  
    // Convert data to CSV format using PapaParse
    const csvContent = Papa.unparse(csvData);
  
    // Create a Blob object from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // Save the file using FileSaver.js
    saveAs(blob, 'filename.csv');
  };


  return timer ? (
    <div>
      <h1 className="mb-5 mt-5">Dictionary</h1>

      <form>
        <div>
          <div className="mx-auto flex font-bold border-3 border-black bg-black text-white">
            <p className="w-2/12 min-w-2/12"> </p>
            <p className="w-5/12">Front</p>
            <p className="w-5/12">Back</p>
          </div>

          {cards
            .map((card: any) => (
              <DictCheckbox
                front={card.front}
                back={card.back}
                key={card.id}
                name={card.id}
                isChecked={false}
                onChange={handleDeleteCards}
              />
            ))
            .reverse()}
        </div>
      </form>
      <div className="grid grid-cols-2">
        <div>
          <button
            className="mt-10 h-14 w-14 text-2xl text-white bg-successMessage cursor-pointer"
            onClick={openPopup}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {isPopupOpen && <Add handleClosePopup={closePopup} />}
        </div>

        <div>
          <button
            className="mt-10 h-14 w-14 text-2xl text-white bg-errorMessage cursor-pointer"
            onClick={myFunction}
          >
            <FontAwesomeIcon icon={faTrash} />{" "}
          </button>
        </div>
      </div>

      <div>
        <button
          className="mt-5 rounded-full text-lg h-14 w-52 bg-buttonBackground text-white border-2 border-white cursor-pointer"
          onClick={downloadCSV}
        >
          Download CSV
        </button>
      </div>
    </div>
  ) : (
    <p className="pb-20">Loading Profile...</p>
  );
}

