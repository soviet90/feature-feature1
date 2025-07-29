import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = 'http://localhost:5135/api/Todo'

  constructor(private http: HttpClient) {}
  
  getTodoList(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl)
  }

  addTodoList(todo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, todo);
  }

  getTodoListById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateTodoList(id: any, tags: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/tags`, tags);
  }
}
