import {Component, EventEmitter, Output} from '@angular/core';
import {DataProvider} from "../../providers/data/data.service";
import {Profile} from "../../models/profile";

/**
 * Generated class for the ProfileSearchComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'profile-search',
  templateUrl: 'profile-search.component.html'
})
export class ProfileSearchComponent {

  query: string;

  profileList: Profile[];

  @Output() selectedProfile: EventEmitter<Profile>;

  constructor(private data: DataProvider) {
    this.selectedProfile = new EventEmitter<Profile>();
  }

  selectProfile(profile) {
    this.selectedProfile.emit(profile);
  }

  searchUser(query: string){

    const trimmedQuery = query.trim();


    if(trimmedQuery === query){

      this.data.searchUser(query).subscribe(profiles => {
        this.profileList = profiles;
      })

    }

  }

}
