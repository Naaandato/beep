import {Profile} from "../models/profile";

const profileList: Profile[] = [
  { firstName: 'Paul', lastName: 'Holly', email: 'paul@paul.p', avatar: 'assets/img/avatar.png', dateOfBirth: new Date() },
  { firstName: 'John', lastName: 'Jjjjj', email: 'john@john.p', avatar: 'assets/img/avatar.png', dateOfBirth: new Date() },
  { firstName: 'Sarah', lastName: 'Sssss', email: 'sarah@sarah.p', avatar: 'assets/img/avatar.png', dateOfBirth: new Date() },
  { firstName: 'Roger', lastName: 'Rrrrr', email: 'roger@roger.p', avatar: 'assets/img/avatar.png', dateOfBirth: new Date() }
];

export const PROFILES_LIST = profileList;
