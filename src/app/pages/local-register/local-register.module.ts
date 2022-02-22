import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalRegisterPageRoutingModule } from './local-register-routing.module';

import { LocalRegisterPage } from './local-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalRegisterPageRoutingModule
  ],
  declarations: [LocalRegisterPage]
})
export class LocalRegisterPageModule {}
