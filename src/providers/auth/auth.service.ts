import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Account} from "../../models/account";
import {LoginResponse} from "../../models/login-res";


@Injectable()
export class AuthProvider {

  constructor(private auth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  getAuthenticatedUser(){
    return this.auth.authState;
  }

  async createUserWithEmailAndPassword(account: Account){
    try {
      return <LoginResponse> {
        result: await this.auth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    }
    catch(e) {
      return <LoginResponse> {
        error: e
      };

    }
  }

  async signInWithEmailAndPassword(account: Account){
    try {
      return <LoginResponse> {
        result: await this.auth.auth.signInWithEmailAndPassword(account.email, account.password)
      }
    }
    catch(e) {
      return <LoginResponse> {
        error: e
      };

    }
  }

  signOut() {
    this.auth.auth.signOut();
  }

}
