import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Profile} from "../../models/profile";
import {DataProvider} from "../../providers/data/data.service";
import {AuthProvider} from "../../providers/auth/auth.service";
import {Subscription} from "rxjs/Subscription";
import {User} from "firebase/app";


@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.component.html'
})
export class EditProfileFormComponent implements OnInit, OnDestroy{

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  @Input() profile: Profile;

  constructor(private auth: AuthProvider, private data: DataProvider) {

    this.saveProfileResult = new EventEmitter<Boolean>();

    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }

  ngOnInit(): void {
    if(!this.profile){
      this.profile = {} as Profile;
    }
  }

  async saveProfile() {

    if (this.authenticatedUser) {
      this.profile.email =this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  ngOnDestroy(): void{
    this.authenticatedUser$.unsubscribe();
  }



}
