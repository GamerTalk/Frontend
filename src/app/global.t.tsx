import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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
}

export interface Systems { 
  [key: string]: IconDefinition;
}
