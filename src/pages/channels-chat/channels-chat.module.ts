import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelsChatPage } from './channels-chat';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ChannelsChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelsChatPage),
    ComponentsModule
  ],
})
export class ChannelsChatPageModule {}
