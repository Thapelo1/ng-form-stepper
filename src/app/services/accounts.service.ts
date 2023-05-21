import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  url: string = "https://jsonplaceholder.typicode.com"

  getUsers(){
    return this.http.get<any>(`${this.url}/users`);
  }
}
