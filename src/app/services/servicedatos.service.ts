import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user.interface';

const ITEMS_KEY = 'users';

@Injectable({
    providedIn: 'root'
})
export class ServicedatosService {

    private storageData: Storage;

    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        const storage = await this.storage.create();
        this.storageData = storage;
    }


    async addDatos(dato: User): Promise<any> {
        const datos = await this.storage.get(ITEMS_KEY);
        if (datos) {
            datos.push(dato);
            return this.storage.set(ITEMS_KEY, datos);
        } else {
            return this.storage.set(ITEMS_KEY, [dato]);
        }
    }


    getDatos(): Promise<User[]> {
        return this.storage.get(ITEMS_KEY);
    }


    async updateDatos(dato: User): Promise<any> {
        const datos = await this.storage.get(ITEMS_KEY);
        if (!datos || datos.length === 0) {
            return null;
        }
        const newDato: User[] = [];
        for (const i of datos) {
            if (i.email === dato.email) {
                newDato.push(dato);
            }
            else {
                newDato.push(i);
            }
        }
        return await this.storage.set(ITEMS_KEY, newDato);
    }

    async updateActive(element: User, active: number): Promise<any> {
        const datos = await this.storage.get(ITEMS_KEY);
        if (!datos || datos.length === 0) {
            return null;
        }
        const newDato: User[] = [];
        for (const i of datos) {
            if (i.email === element.email) {
                element.active = active;
                newDato.push(element);
            }
            else {
                newDato.push(i);
            }
        }
        return await this.storage.set(ITEMS_KEY, newDato);
    }

    async deleteDatos(email: string): Promise<User> {
        const datos = await this.storage.get(ITEMS_KEY);
        if (!datos || datos.length === 0) {
            return null;
        }
        const toKeep: User[] = [];
        for (const i of datos) {
            if (i.email !== email) {
                toKeep.push(i);
            }
        }
        return await this.storage.set(ITEMS_KEY, toKeep);

    }

    async login(email: string, pass: string): Promise<any> {
        const datos = await this.storage.get(ITEMS_KEY);
        let encontrado = false;
        if (!datos || datos.length === 0) {
            encontrado = false;
        } else {
            datos.forEach(element => {
                if (element.email === email && element.password === pass) {
                    this.updateActive(element, 1);
                    console.log('encontrado');
                    return encontrado = true;
                }
            });
            return encontrado;

        }
    }

    async logout(): Promise<any> {
        const datos = await this.storage.get(ITEMS_KEY);
        let encontrado = false;
        if (!datos || datos.length === 0) {
            encontrado = false;
        }
        datos.forEach(element => {
            if (element.active === 1) {
                this.updateActive(element, 0);
                encontrado = true;
            }
            else {
                encontrado = false;
            }
        });
        return encontrado;
    }
}
