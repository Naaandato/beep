import {Component, OnInit} from '@angular/core';
import {DataProvider} from "../../providers/data/data.service";
import {FirebaseListObservable} from "angularfire2/database";
import {Profile} from "../../models/profile";
import {NavController} from "ionic-angular";

/**
 * Generated class for the OnlineUsersComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit{

  userList: FirebaseListObservable<Profile[]>

  constructor(private navCtrl: NavController, private data: DataProvider) {

  }

  ngOnInit(): void {
    this.setUserOnline();
    this.getOnlineUsers();
  }


  setUserOnline(){
    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.data.setUserOnline(profile);
    })
  }

  getOnlineUsers() {
    this.userList = this.data.getOnlineUsers();
  }

  openChat(profile: Profile){
    this.navCtrl.push('MessagePage', {profile})
  }

}
