import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Channel} from "../../models/channel";
import {ChatProvider} from "../../providers/chat/chat.service";
import {FirebaseListObservable} from "angularfire2/database";
import {ChannelMessage} from "../../models/channel-message";

/**
 * Generated class for the ChannelsChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channels-chat',
  templateUrl: 'channels-chat.html',
})
export class ChannelsChatPage {

  channel: Channel;
  channelMessages: FirebaseListObservable<ChannelMessage[]>;

  constructor(private chat: ChatProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.channel = this.navParams.get('channel');
    this.channelMessages = this.chat.getChannelChatRef(this.channel.$key);
  }

  sendMessage(content: string){
    let channelMessage: ChannelMessage = {
      content
    };

    this.chat.sendChannelChatMessage(this.channel.$key, channelMessage);


  }


}
