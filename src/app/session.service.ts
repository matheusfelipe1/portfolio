import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Enviroments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baserUrl: string = Enviroments.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(body: any): Observable<any> {
    return this.http.post(`${this.baserUrl}/v1/sendEmailV1`, body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(take(1))
  }
}
