import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Channel} from "../../models/channel";
import {ChannelMessage} from "../../models/channel-message";


@Injectable()
export class ChatProvider {

  constructor(private database: AngularFireDatabase) {

  }

  addChannel(channelName: string) {
    this.database.list(`/channels-names/`).push({ name: channelName })
  }

  getChannelListRef(): FirebaseListObservable<Channel> {
    return this.database.list(`channels-names`);
  }

  getChannelChatRef(channelKey: string) {
    return this.database.list(`channels/${channelKey}`);
  }

  async sendChannelChatMessage(channelKey: string, message: ChannelMessage) {
    await this.database.list(`/channels/${channelKey}`).push(message);
  }

}
