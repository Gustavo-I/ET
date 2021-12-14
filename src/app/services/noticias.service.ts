import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { RespuestaToHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadLines()
  {
    return this.http.get<RespuestaToHeadLines>
    ('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=fc7d9914898440dbbd18848dcadd6851');
  }

}
