import {Component, OnInit} from '@angular/core';
import {ChatProvider} from "../../providers/chat/chat.service";
import {Message} from "../../models/message";
import {Observable} from "rxjs/Observable";
import {NavController} from "ionic-angular";

/**
 * Generated class for the LastMessageListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'last-message-list',
  templateUrl: 'last-message-list.html'
})
export class LastMessageListComponent implements OnInit{

  messageList$: Observable<Message[]>;

  constructor(private navCtrl: NavController, private chat: ChatProvider) {

  }

  ngOnInit() {
    this.messageList$ = this.chat.getLastMessagesForUser();
  }

  navigateToMessage(message: Message) {
    const selectedProfile = {
      $key: message.userToId,
      firstName: message.userToProfile.firstName,
      lastName: message.userToProfile.lastName
    }

    this.navCtrl.push('MessagePage', {profile: selectedProfile});

  }




}
