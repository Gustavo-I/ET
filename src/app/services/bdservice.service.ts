import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Sweetalert2Service } from './sweetalert2.service';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  private bdservice: string = environment.bdservice;
  private headers = environment.httpHeaders;
  private httpOptions = {
    headers: new HttpHeaders(this.headers),
  };
  constructor(private http: HttpClient, private sweet: Sweetalert2Service) { }


  postUser(user: User){
    console.log(user);
    return this.http.post<any>(`${this.bdservice}/post/usuario`, user, this.httpOptions);
  }
}
