import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataProvider} from "../../providers/data/data.service";
import {AuthProvider} from "../../providers/auth/auth.service";
import {User} from "firebase/app";
import {Profile} from "../../models/profile";
import {Loading, LoadingController} from "ionic-angular";


@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.component.html'
})
export class ProfileViewComponent implements OnInit{

  private authUser: User;
  public userProfile: Profile;
  private loader: Loading;

  @Output() existingProfile: EventEmitter<Profile>;

  ngOnInit(): void {
    this.loader.present();

    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.userProfile = profile;
      this.existingProfile.emit(this.userProfile);
      this.loader.dismiss();
    });

    // this.auth.getAuthenticatedUser().subscribe((user: User) => {
    //   this.data.getProfile(user).subscribe((profile) => {
    //     this.userProfile = <Profile>profile.val();
    //     this.existingProfile.emit(this.userProfile);
    //     this.loader.dismiss();
    //   })
    // })
  }

  constructor(private loading: LoadingController, private data: DataProvider, private auth: AuthProvider) {

    this.existingProfile = new EventEmitter<Profile>();

    this.loader = this.loading.create({
      content: 'Loading Profile...'
    })
  }



}
