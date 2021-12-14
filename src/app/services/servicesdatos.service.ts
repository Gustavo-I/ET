import { Injectable } from '@angular/core';
import { Storage }  from '@ionic/storage';

export interface Suscrito{
  id : number;
  rut: string;
  nom: string; 
  apellido: string; 
  direccion: string;
  email: string;
  telefono:number;
  modified: number;
}

const ITEMS_KEY = 'my-datos';

@Injectable({
  providedIn: 'root'
})
export class ServicedatosService {

  private _storage : Storage;

  constructor(private storage: Storage) { 
    this.init();
   }

   //definimos en un método la creación del almacenamiento
  async init(){
    const storage = await this.storage.create();
    this._storage= storage;
  }

  
  addDatos(dato: Suscrito):Promise<any>{
   return this.storage.get(ITEMS_KEY).then((datos : Suscrito[])=>{
      if (datos) {
        datos.push(dato);
        return this.storage.set(ITEMS_KEY, datos);
      }else {
        return this.storage.set(ITEMS_KEY, [dato]);
      }

    })
  }

   //Nos permmite obtener la información almacenada en el storage 
   //por medio de sus keys 

   getDatos(): Promise<Suscrito[]>{
    return this.storage.get(ITEMS_KEY);
  }


  //actualizar información de un objeto 
  updateDatos(dato: Suscrito): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Suscrito[])=>{
      if (!datos || datos.length == 0){
        return null;
      }
      let newDato: Suscrito[] = [];
      for (let i of datos){
        if (i.id === dato.id){
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newDato);
    });
  }

   //Eliminar
  deleteDatos(id: number): Promise<Suscrito>{
    return this.storage.get(ITEMS_KEY).then((datos : Suscrito[])=>{
      if (!datos || datos.length === 0){
        return null;
      }
      let toKeep: Suscrito[] = []; 
      for (let i of datos){
        if (i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });

  }


}
