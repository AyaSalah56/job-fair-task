import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl:string = "http://localhost:3000/"

  // private jsonUrl = 'assets/db.json';

  constructor(private HttpClient:HttpClient) { }

  // getData():Observable<any> {
  //   return this.http.get<any>(this.jsonUrl);
  // }

  getCustomer():Observable<any>{
    return this.HttpClient.get<any[]>(`${this.baseUrl}customers`)
  }

}

