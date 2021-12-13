import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ModalRegPageModule } from 'src/app/modal-reg/modal-reg.module';
import { ModalRegPage } from 'src/app/modal-reg/modal-reg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalRegPageModule
  ],
  declarations: [LoginPage],
  entryComponents:[ModalRegPage]
})
export class LoginPageModule {}
