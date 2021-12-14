import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenuToggle, MenuController } from '@ionic/angular';


import { Componente } from './interfaces/component.interface';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  componentes: Componente[] = [
    {
      icon: 'man-outline',
      name: 'Inicio',
      redirecTo: '/home'
    },

    {
      icon: 'add-circle-outline',
      name: 'Agregar Auto',
      redirecTo: '/suscripcion'
    },
    
  ];
  constructor(
    public auth: AuthenticationService,
    public router: Router, private menu: MenuController) {
    // this.initializeApp();
  }

  ngOnInit(): void {
    document.body.setAttribute('color-theme', 'dark');
  }

  onClick(){
    this.auth.logout();
    this.menu.enable(false);
    this.router.navigate(['/login']);
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.createDatabase();
  //     this.authenticationService.authState.subscribe(state => {
  //       if (state) {
  //         this.router.navigate(['home']);
  //       } else {
  //         this.router.navigate(['login']);
  //       }
  //     });
  //   });
  // }
}
