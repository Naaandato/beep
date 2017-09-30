import {Component, EventEmitter, Output} from '@angular/core';
import {Account} from "../../models/account";
import {AuthProvider} from "../../providers/auth/auth.service";
import {LoginResponse} from "../../models/login-res";


@Component({
  selector: 'register-form',
  templateUrl: 'register-form.component.component.html',

})
export class RegisterFormComponent {

  account = {} as Account;
  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthProvider) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      this.registerStatus.emit(result);

    } catch (e) {
      this.registerStatus.emit(e);
    }
  }

}
