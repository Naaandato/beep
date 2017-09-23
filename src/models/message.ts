import {Profile} from "./profile";

export interface Message {
  user: Profile;
  date: Date;
  lastMessage: string;
}
