import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Registro{
  id : number;
  modified: number;
  rut: string;
  nom: string; 
  numerocel: number; 
  email: string;
  contrasena:string;

}

const ITEMS_KEY = 'bd';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _storage : Storage;

  constructor(private storage: Storage) { 
    this.init();
   }

   //definimos en un método la creación del almacenamiento
  async init(){
    const storage = await this.storage.create();
    this._storage= storage;
  }

  
  addDatos(dato: Registro):Promise<any>{
   return this.storage.get(ITEMS_KEY).then((datos : Registro[])=>{
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

   getDatos(): Promise<Registro[]>{
    return this.storage.get(ITEMS_KEY);
  }


  //actualizar información de un objeto 
  updateDatos(dato: Registro): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Registro[])=>{
      if (!datos || datos.length == 0){
        return null;
      }
      let newDato: Registro[] = [];
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
  deleteDatos(id: number): Promise<Registro>{
    return this.storage.get(ITEMS_KEY).then((datos : Registro[])=>{
      if (!datos || datos.length === 0){
        return null;
      }
      let toKeep: Registro[] = []; 
      for (let i of datos){
        if (i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });

  }

}
