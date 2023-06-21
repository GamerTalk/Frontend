import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface User {
  id: number;
  uid: string;
  username: string;
  date_of_birth: string;
  about_me: string;
  languages: {
    fluent: string[];
    learning: {
      level: number;
      language: string;
    }[];
  };
  currently_playing: string;
  user_systems: string[];
  user_genre: string[];
  user_region: string;
  profile_picture_url: string; 
}

export interface Systems {
  [key: string]: IconDefinition;
}

export interface Search {
  systems: string[];
  genre: string[];
  language: string;
}

export interface Chat { 
    date: {
      seconds: number;
      nanoseconds: number;
    };
    lastMessage: string ;
    userInfo: {
      uid: string;
      userName: string;
  }
}

export interface UserMessage {
  date: Date;
  id: string;
  senderId: string;
  text: string;
}

export interface Post {
  id: number;
  sender_uid: string;
  sender_data: User;
  time_of_message: string;
  message: string;
  sender: string;
}