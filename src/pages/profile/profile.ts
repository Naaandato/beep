import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Profile} from "../../models/profile";
import {AuthProvider} from "../../providers/auth/auth.service";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  existingProfile = {} as Profile;

  constructor(private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  getExistingProfile(profile: Profile){
    this.existingProfile = profile;
  }

  navigateToPage(pageName :string){
    this.navCtrl.push(pageName, {existingProfile: this.existingProfile});
  }

  signout(){
    this.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }


}
