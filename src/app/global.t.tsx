import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface User {
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
  user_regions: string[];
}

export interface OtherUsers {
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