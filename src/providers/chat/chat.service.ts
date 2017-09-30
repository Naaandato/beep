import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Channel} from "../../models/channel";
import {ChannelMessage} from "../../models/channel-message";
import {Message} from "../../models/message";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import {Observable} from "rxjs/Observable";
import {AuthProvider} from "../auth/auth.service";


@Injectable()
export class ChatProvider {

  constructor(private auth: AuthProvider, private database: AngularFireDatabase) {

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

  async sendChat(message: Message){
    await this.database.list(`/messages`).push(message);
  }

  getChats(userTwoId: string){
    return this.auth.getAuthenticatedUser()
      .map(auth => auth.uid)
      .mergeMap(uid => this.database.list(`/user-messages/${uid}/${userTwoId}`))
      .mergeMap(chats => {
        return Observable.forkJoin(
          chats.map(chat => this.database.object(`/messages/${chat.$key}`)
            .first()),
          (...vals: Message[]) => {
            return vals;
          }
        )
      })
  }

  getLastMessagesForUser(): Observable<Message[]> {
    return this.auth.getAuthenticatedUser()
      .map(auth => auth.uid)
      .mergeMap(authId => this.database.list(`/last-messages/${authId}`))
      .mergeMap(messageIds => {
        return Observable.forkJoin(
          messageIds.map(message => {
            return this.database.object(`/messages/${message.key}`).first()
          }),
          (...values) => {
            return values;
          }
        )
      })
  }


}
