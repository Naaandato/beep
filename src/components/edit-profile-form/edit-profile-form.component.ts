import { Component } from '@angular/core';
import {Profile} from "../../models/profile";


@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent {

  profile = {} as Profile;

  constructor() {
  }

  saveProfile() {

  }

}
