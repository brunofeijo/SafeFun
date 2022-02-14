import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialRegisterPageRoutingModule } from './material-register-routing.module';

import { MaterialRegisterPage } from './material-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialRegisterPageRoutingModule
  ],
  declarations: [MaterialRegisterPage]
})
export class MaterialRegisterPageModule {}
