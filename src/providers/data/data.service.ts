import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {User} from "firebase/app";
import {Profile} from "../../models/profile";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {AuthProvider} from "../auth/auth.service";
import { database } from 'firebase';

@Injectable()
export class DataProvider {

  profileObject: FirebaseObjectObservable<Profile>;
  profileList: FirebaseListObservable<Profile>;

  constructor(private authProvider: AuthProvider, private database: AngularFireDatabase) {
  }

  searchUser(firstName: string){
    const query = this.database.list('/profile', {
      query: {
        orderByChild: 'firstName',
        equalTo: firstName
      }
    });

    return query.take(1);
  }

  getAuthenticatedUserProfile() {
    return this.authProvider.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authId => this.database.object(`/profile/${authId}`))
      .take(1);
  }

  getProfile(user: User){
    this.profileObject = this.database.object(`/profile/${user.uid}`, {preserveSnapshot: true});

    return this.profileObject.take(1);
  }

  async saveProfile(user: User, profile: Profile){
    this.profileObject = this.database.object(`/profile/${user.uid}`);

    try {
      await this.profileObject.set(profile);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  setUserOnline(profile: Profile) {
    const ref = database().ref(`online-users/${profile.$key}`);


    try {
      ref.update({...profile});
      ref.onDisconnect().remove();
    } catch (e) {
      console.error(e);
    }
  }

  getOnlineUsers(): FirebaseListObservable<Profile[]> {
    return this.database.list(`online-users`);
  }




}
