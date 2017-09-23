import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  register(event){
    console.log(event);
    if (!event.error){
      this.toast.create({
        message: `Account created: , ${event.result.email}`,
        duration: 3000
      }).present();
      this.navCtrl.setRoot("ProfilePage");
    }else{
      this.toast.create({
        message: `Account not created. , ${event.error.message}`,
        duration: 3000
      }).present();
    }
  }

}
