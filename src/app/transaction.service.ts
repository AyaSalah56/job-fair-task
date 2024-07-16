import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl:string = "http://localhost:3000/"
  constructor(private HttpClient:HttpClient) { }

  getTransaction():Observable<any>{
    return this.HttpClient.get<any[]>(`${this.baseUrl}transactions`)
  }
}
