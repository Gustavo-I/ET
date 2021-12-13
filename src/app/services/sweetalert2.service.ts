import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class Sweetalert2Service {

    constructor() { }

    sweetOK(titulo: string, msg: string) {

        swal.fire({
            icon: 'success',
            title: titulo,
            text: msg
        });
    }

    sweetErr(titulo: string, msg: string) {
        swal.fire({
            icon: 'error',
            title: titulo,
            text: msg
        });
    }

    sweetWarning(titulo: string, msg: string) {
        swal.fire({
            icon: 'warning',
            title: titulo,
            text: msg
        });
    }
}
