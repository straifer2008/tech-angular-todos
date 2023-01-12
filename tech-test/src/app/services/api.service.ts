import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface RequestOptionsI {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

interface PostOptionsI {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<T>(url: string, options?: RequestOptionsI): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${url}`, options);
  }

  post<T>(url, body, options?: RequestOptionsI): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${url}`, body, options);
  }

  patch<T>(url, body, options?: RequestOptionsI): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${url}`, body, options);
  }

  delete<T>(url: string, options?: RequestOptionsI): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${url}`, options);
  }
}
