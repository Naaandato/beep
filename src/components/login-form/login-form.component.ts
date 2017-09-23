import {Component, EventEmitter, Output} from '@angular/core';
import {NavController} from "ionic-angular";
import {Account} from "../../models/account";
import {LoginResponse} from "../../models/login-res";
import {AuthProvider} from "../../providers/auth/auth.service";

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {

  text: string;

  account = {} as Account;
  @Output() loginStatus: EventEmitter<LoginResponse>;


  constructor(private auth: AuthProvider, public navCtrl: NavController) {
    this.loginStatus = new EventEmitter<any>();
  }

  async login(){

    const loginResponse = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(loginResponse);

  }

  navigateToPage(pageName :string){
    pageName === 'TabsPage' ? this.navCtrl.setRoot(pageName) : this.navCtrl.push(pageName);
  }

}
