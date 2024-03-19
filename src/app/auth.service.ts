
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  register(username: string, password: string, email: string,name: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { username, password ,name, email};
    return this.http.post(url, body);
  }


  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { username, password };
    return this.http.post(url, body);
  }

  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    return this.http.get(url);
  }
}
