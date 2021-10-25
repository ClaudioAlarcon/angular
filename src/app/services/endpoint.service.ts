import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor(private http: HttpClient) { }

  /**
  * This function is used to get the data from the endpoint
  * @param url endpoint url
  * @returns response from the endpoint
  */
  public getData(url: string): Observable<any> {
    return this.http.get(url);
  }
}
