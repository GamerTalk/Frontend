"use client";

import Checkbox from "../components/elements/Checkbox";
import LearningCheckbox from "../components/elements/Learning-Checkbox";
import { useState, useEffect, ChangeEvent, SetStateAction } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import categories from "../data/data";
import AlertModal from "../components/layouts/AlertModal";
import Image from "next/image";

export default function UserInfo() {
  const { uid, user,updateUserInfo,retrieve } = UserAuth()
  const [username, setUsername] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [language, setLanguage] = useState<string[]>([]);
  const [learning, setLearning] = useState<string[]>([]);
  const [birthday, setBirthday] = useState("");
  const [defaultDate, setDefaultDate] = useState<string | undefined>(undefined);
  const [system, setSystem] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState<string>("");
  const [aboutMeLength, setAboutMeLength] = useState<number>(0)
  const [currPlay, setCurrPlay] = useState<string>("");
  const [currPlayLength, setCurrPlayLength] = useState<number>(0)
  // AlertModal
  const [open, setOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  // for setting up user profile image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  /*
      "uid": "delete me", // NOT LOWER CASE
#     "username": "GodSlayerXD", // NOT LOWERCASE
#      region: 
#     "about_me": "I was born in a log cabin.", // NOT LOWERCASE
#     "fluent": ["english", "spanish"],
#     "learning": [{"language":"german", "level": 1}, {"language":"japanese", "level": 3}],
#     "date_of_birth": "1999-01-01",
#     "systems": ["playstation","PC"],
#     "genre": ["FPS", "survival"],
#     "currently_playing": "I am currently playing COD MW2, Fortnite, and some Ark Survival" // NOT LOWERCASE
*/
  
  
const handleClose = () => setOpen(false);
  
  const isAllFieldsFilled = () => { 
    return (
      username.trim() === '' ||
      region.trim() === '' ||
      language.length === 0 ||
      learning.length === 0 ||
      birthday.trim() === '' ||
      system.length === 0 ||
      genre.length === 0 ||
      aboutMe.trim() === '' ||
      currPlay.trim() === ''
    );
  }

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    
    if (isAllFieldsFilled()) {
      setAlertMessage("All sections must be filled.");
      setOpen(true);
    } else {
      // upload a user profile picutre to firebase
    if (selectedFile) {
      // uid + filename makes a path of profile img in firebase storage
      const storageRef = ref(storage, `/images/${uid}/${selectedFile.name}`);
      try {
        // upload
        const uploadedSnapshot = await uploadBytesResumable(
          storageRef,
          selectedFile
        );
        // url to access to firebase storage
        const downLoadURL: string = await getDownloadURL(uploadedSnapshot.ref);
        // send to data to
        sendFormData(downLoadURL);
       // console.log("upload is successed");
      } catch (error) {
        // error handling
        console.error("Upload error:", error);
      }
    } else {
      // user image as default
      const defaultPath = "/images/default/userdefault.png";
      const storageRef = ref(storage, defaultPath);
      try {
        const downloadURL = await getDownloadURL(storageRef);
        sendFormData(downloadURL);
        //console.log("default image upload is successed");
      } catch (error) {
        console.error("download error", error);
      }
    }
    }

  };

  const sendFormData = (profileImagURL: string) => {

    const payload = {
      uid,
      username,
      region,
      about_me: aboutMe,
      fluent: language,
      learning,
      date_of_birth: birthday,
      systems: system,
      genre,
      currently_playing: currPlay,
      profile_picture_url: profileImagURL,
    };

    // send a data to firestore
    setDoc(doc(db, "users", uid!), {
      uid: uid,
      userName: username,
      profileURL: profileImagURL,
    });

    const url = process.env.NEXT_PUBLIC_API_URL + "/api/new-user/";

    axios.post(url, payload)
      .then(response => {
        if (user) {
          retrieve(user);
        }
        router.push('/home')
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage('Please fill in all required fields');
        setOpen(true);
      });
  };

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handleRegion = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRegion(value.toLowerCase());
  };

  const handleLanguage = (event: {
    target: { name: string; value: string };
  }) => {
    const { name } = event.target;
    if (language.includes(name)) {
      // If language is already selected, remove it from the array
      setLanguage((prevLanguages) =>
        prevLanguages.filter((lang) => lang !== name)
      );
    } else {
      // If language is not selected, add it to the array
      setLanguage((prevLanguages) => [...prevLanguages, name]);
    }
  };

  const handleLearning = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    const newObj = { language: name, level: Number(value) };

    const languageExists = learning.some(
      (learn: any) => learn.language === name
    );
    if (languageExists) {
      // If language is already selected, update its level only
      setLearning((prevLearning) =>
        prevLearning.map((learn: any) =>
          learn.language === name ? { ...learn, level: value } : learn
        )
      );
    } else {
      // If language is not selected, add it to the array
      setLearning((prevLearning: any) => [...prevLearning, newObj]);
    }
  };

  function getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
  return age;
  }

  function eighteenYearsAgo(): string | undefined {
    var today = new Date();
    var eighteen = today.getFullYear() - 18;
    return eighteen + "-01-01" 
  }

  useEffect(() => {
    setDefaultDate(eighteenYearsAgo());
  }, []);


  const handleBirthday = (event: ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    
    if (getAge(dateValue) < 18) {
      setAlertMessage('You have to be over 18 to register for GamerTalk');
      setOpen(true);
    } else {
      setBirthday(dateValue)
    }
    
  };

  const handleSystem = (event: { target: { name: string } }) => {
    const { name } = event.target;
    if (system.includes(name)) {
      // If system is already selected, remove it from the array
      setSystem((prevSystem) => prevSystem.filter((sys) => sys !== name));
    } else {
      // If system is not selected, add it to the array
      setSystem((prevSystem) => [...prevSystem, name]);
    }
  };

  const handleGenre = (event: { target: { name: string } }) => {
    const { name } = event.target;
    if (genre.includes(name)) {
      // If genre is already selected, remove it from the array
      setGenre((prevGenre) => prevGenre.filter((gen) => gen !== name));
    } else {
      // If genre is not selected, add it to the array
      setGenre((prevGenre) => [...prevGenre, name]);
    }
  };

  const handleAboutMe = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setAboutMe(value);
    setAboutMeLength(value.length)
  };

  const handleCurrPlay = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setCurrPlay(value);
    setCurrPlayLength(value.length)
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl pt-5 pb-1">Welcome!</h1>
      <p className="pb-5">Tell us about yourself!</p>

      {open && (
        <AlertModal open={open} handleClose={handleClose} title="Validation Error"
          message={alertMessage}
        />
      )}

      <form method="post" onSubmit={handleFormSubmit}>
        <div className="pb-5" >
          <label htmlFor="Username" className="font-bold text-2xl py-5-align-left">
            {" "}
            Username
          </label>
          <div>
            <input
              type="text"
              id="UserName"
              name="Username"
              className="text-black px-3 py-1"
              minLength={5}
              maxLength={15}
              onChange={handleUsername}  
            ></input>
          </div>
          <p className="mt-2 text-gray-400 text-15xl" >Username should be between 5-15 characters</p>
        </div>
        

        <div className="h-16 w-16 mb-5 object-cover m-auto">
          <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/gamertalk-8133c.appspot.com/o/images%2Fdefault%2Fuserdefault.png?alt=media&token=00630336-daf3-4b5d-ab58-895d704863b6"
              }
              alt='profile-image' 
          />
            {/* <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/gamertalk-8133c.appspot.com/o/images%2Fdefault%2Fuserdefault.png?alt=media&token=00630336-daf3-4b5d-ab58-895d704863b6"
              }
              alt='profile-image'
              id={styles.image}
              height={70}
              width={70}
            /> */}
        </div>

        <div>
          <label>
            <input type="file" name="image" onChange={handleFileChange} id="w-24 overflow-hidden mt-4 pt-3 hidden" />
          </label>
        </div>

        <p className="font-bold text-2xl pt-5 pb-5">Region</p>
        <div className="grid grid-cols-2 gap-3 p-5 border-2 border-gray-400 mx-auto w-[95%] rounded-2xl">
        {categories.regions.map((regionOption:string, key:number) => { 
              return (
                <div key={key}>
                  <Checkbox
                    type="radio"
                    label={regionOption}
                    name="region"
                    value={regionOption.toLocaleLowerCase()}
                    onChange={handleRegion}
                    defaultChecked={false}
                  />
                </div>
              )
            })}
        </div>

        <p className="font-bold text-2xl py-2 pt-5">What language(s) are you fluent in?</p>
        <p className="mt-0 text-base pb-2">Check all that apply</p>
        <div className="grid grid-cols-2 gap-2 p-5 border-2 border-gray-400 mx-auto w-[95%] rounded-2xl">
        {categories.languages.map((languageOption:string, key:number) => { 
              return (
                <div key={key}>
                  <Checkbox
                    type="Checkbox"
                    label={languageOption}
                    name={languageOption.toLocaleLowerCase()}
                    value=""
                    onChange={handleLanguage}
                    defaultChecked={false}
                  />
                </div>
              )
            })}
        </div>

        <p id="learning" className="font-bold text-2xl py-5">
          What language(s) do you want to learn and what is your level?
        </p>
        <div className="mx-auto pb-3 w-4/5 md:w-[50%] lg:w-[50%]">
          <div className="text-center pb-3">
            {"  "}
            <p><span className="font-bold">1</span>: Beginner</p>
            <p><span className="font-bold">2</span>: Elementary</p>
            <p><span className="font-bold">3</span>: Intermediate</p>
            <p><span className="font-bold">4</span>: Advanced</p>
            <p><span className="font-bold">5</span>: Proficent</p>
          </div>
        </div>
        <p className="pb-3">
          For a more detailed explanation{" "}
          <a href="#levels-explain" className="text-blue-600">
            click here
          </a>{" "}
        </p>
        <div className="w-[95%] mx-auto">
          <div className="grid grid-cols-6 font-bold">
            <div>Language</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
          </div>
          {categories.languages.map((languageOption, key) => { 
              const languageOptionLowerCase = languageOption.toLocaleLowerCase();
              return (
                <div key={key}>
                  <LearningCheckbox
                    label={languageOption}
                    name={languageOptionLowerCase}
                    onChange={handleLearning}
                    defaultChecked1={false}
                    defaultChecked2={false}
                    defaultChecked3={false}
                    defaultChecked4={false}
                    defaultChecked5={false}
                  />
                </div>
              );
            })}
        </div>

        <p className="font-bold text-2xl py-6">Date of Birth</p>
        <input type="date" className=" p-2 text-black" defaultValue={defaultDate} onChange={handleBirthday}></input>

        <p className="font-bold text-2xl py-5">System(s)</p>
        <div className="grid grid-cols-2 gap-2 p-5 border-2 border-gray-400 mx-auto w-[95%] rounded-2xl">
        {categories.systems.map((systemOption:string, key:number) => { 
              return (
                <div key={key}>
                  <Checkbox
                    type="checkbox"
                    label={systemOption}
                    name={systemOption.toLocaleLowerCase()}
                    value=""
                    onChange={handleSystem}
                    defaultChecked={false}
                  />
                </div>
              )
            })}
          
        </div>

        <p className="font-bold text-2xl py-5">Genre</p>
        <div className="grid grid-cols-2 gap-2 p-5 border-2 border-gray-400 mx-auto w-[95%] rounded-2xl">
        {categories.genres.map((genreOption:string, key:number) => { 
              return (
                <div key={key}>
                  <Checkbox
                    type="Checkbox"
                    label={genreOption}
                    name={genreOption.toLocaleLowerCase()}
                    value=""
                    onChange={handleGenre}
                    defaultChecked={false}
                  />
                </div>
              )
            })}
        </div>

        <p className="font-bold text-2xl py-5">About Me</p>
        <textarea 
          className="resize-none" 
          rows={5} 
          cols={40} 
          onChange={handleAboutMe} 
          maxLength={500} 
        />
        <p className="mt-n3 text-zinc-400 text-15xl">{aboutMeLength} / 500</p>

        <p className="font-bold text-2xl py-5">Currently Playing</p>
        <textarea 
          className="resize-none" 
          rows={5} 
          cols={40} 
          onChange={handleCurrPlay} 
          maxLength={500}
        />
        <p className="mt-n3 text-zinc-400 text-15xl">{currPlayLength} / 500</p>

        <div>
          <button className="mt-8 mb-5 text-xl h-12 w-40 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 border-2 border-white" type="submit">
            Submit
          </button>
        </div>

        <div className="pt-40 pb-20">
          <a id="levels-explain" href="#learning" className="text-blue-600">
            Go back
          </a>
          <h1 className="text-2xl">Language Levels</h1>
          <h2 className="font-bold text-2xl text-left pt-4">Beginner</h2>
          <p className="text-left">
            Can make introductions and can ask and answer simple questions.
          </p>
          <h2 className="font-bold text-2xl text-left pt-4">Elementary</h2>
          <p className="text-left">
            Can converse common topics and in daily situations.
          </p>
          <h2 className="font-bold text-2xl text-left pt-4">Intermediate</h2>
          <p className="text-left">
            Can interact with native speakers more fluently and spontaneously.
          </p>
          <h2 className="font-bold text-2xl text-left pt-4">Advanced</h2>
          <p className="text-left">
            Can express yourself naturally, effortlessly recalling authentic
            expressions.
          </p>
          <h2 className="font-bold text-2xl text-left pt-4">Proficient</h2>
          <p className="text-left">
            Can comfortably comphrehend most things heard and read.
          </p>
        </div>
      </form>
    </div>
  );
}
function eighteenYearsAgo(): SetStateAction<string | undefined> {
  throw new Error("Function not implemented.");
}

