import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user.interface';
import { ModalRegPage } from 'src/app/modal-reg/modal-reg.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailPattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  loginForm: FormGroup = new FormGroup({email: new FormControl(),
                                        password: new FormControl()});

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private modalCtrl: ModalController,
    private auth: AuthenticationService) {
    this.crearForm();
  }

  ngOnInit() {
  }

  crearForm(){
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['',[Validators.required, Validators.minLength(5)]]
    });
  };

  get emailNotValid(){
    const getEmail = this.loginForm.get('email');
    return getEmail.invalid && getEmail.touched;
  }

  get passwordNotValid(){
    const getPassword = this.loginForm.get('password');
    return getPassword.invalid && getPassword.touched;
  }

  onSubmit(){
    if(this.loginForm.invalid){
      Object.values(this.loginForm.controls).forEach(control=>{
        control.markAsTouched();
        control.setValue('');
      });
      return;
    }else{
      const user: User = this.loginForm.value;
      this.auth.login(user.email, user.password);
    }
  }

  async abrirModal() {
    // this.modal = true;
    const modal = await this.modalCtrl.create({
      component: ModalRegPage,
      componentProps: {
        // getdata: prod
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    // if (data === 1) {
    //   this.modal = false;
    // }else if(data && data !== 1){
    //   this.modal = false;
    //   this.prodServ.putProductos(data.row.sku, data.row);
    // }
  }

}
