import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class ApiService {
  private apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Método para obter dados
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  // Método para obter dados a partir de um ID
  getDataById(endpoint: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  // Método para enviar dados
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  // Método para atualizar dados
  updateData(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data);
  }

  // Método para excluir dados
  deleteData(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}/${id}`);
  }
}
