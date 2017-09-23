import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginResponse} from "../../models/login-res";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  login(event: LoginResponse){
    console.log(event);
    if (!event.error){
      this.toast.create({
        message: `Welcome to Beep, ${event.result.email}`,
        duration: 3000
      }).present();
      this.navCtrl.setRoot("EditProfilePage");
    }else{
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }

  }

}
