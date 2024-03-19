import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortLinkService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  createShortLink(originalUrl: string, userId: string): Observable<any> {
    const url = `${this.apiUrl}/create_short_link`;
    const body = { original_url: originalUrl, user_id: userId };
    return this.http.post(url, body);
  }

  getAnalytics(): Observable<any> {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found in local storage');
      return throwError('User ID not found');
    }

    const url = `${this.apiUrl}/analytics`;
    return this.http.get(`${url}/${userId}`);
  }

  redirectUrl(shortUrl: string): Observable<any> {
    const url = `${this.apiUrl}/${shortUrl}`;
    return this.http.get(url);
  }

}

