import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getSomething() {
    return this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/comments')
      .toPromise();
  }
}
