

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