import { Component, OnInit,ViewChild } from '@angular/core';
import { ServicedatosService, Suscrito } from 'src/app/services/servicesdatos.service';
import { Platform, ToastController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.page.html',
  styleUrls: ['./suscripcion.page.scss'],
})


  export class SuscripcionPage implements OnInit {

    suscritos: Suscrito[] = [];
    newDato: Suscrito = <Suscrito>{};
    
    @ViewChild('myList')myList :IonList; 
    
  
    constructor(private storageService: ServicedatosService, 
      private plt: Platform, private toastController: ToastController)
       {
        this.plt.ready().then(()=>{
          this.loadDatos();
      });
    }
  
    ngOnInit() {
    }
  
    //get
    loadDatos(){
      this.storageService.getDatos().then(datos=>{
        this.suscritos=datos;
      });
    }
  
     //create
     addDatos(){
      this.newDato.modified = Date.now();
      this.newDato.id = Date.now();
      this.storageService.addDatos(this.newDato).then(dato=>{
        this.newDato = <Suscrito>{};
        this.showToast('!Datos Agregados');
        this.loadDatos();
      });
    }
  
    //update
    updateDatos(dato: Suscrito ){
      dato.nom = `UPDATED: ${dato.nom}`;
      dato.modified = Date.now();
      this.storageService.updateDatos(dato).then(item=>{
        this.showToast('Elemento actualizado!')
        this.myList.closeSlidingItems();
        this.loadDatos();
      });
    } 
  
    //delete
    deleteDatos(dato: Suscrito){
      this.storageService.deleteDatos(dato.id).then(item=>{
        this.showToast('Elemento eliminado');
        this.myList.closeSlidingItems();
        this.loadDatos();
      });
    }
  
    async showToast(msg){
      const toast = await this.toastController.create({
        message: msg, 
        duration: 2000
      });
      toast.present();
    }
  
  
  }
  
