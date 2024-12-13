import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app'; 
  data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.getData('movies')
      .subscribe({
        next: (response) => {
          console.log('Dados recebidos:', response);
          this.data = response;
        },
        error: (error) => {
          console.error('Erro ao buscar dados:', error);
        }
      });
  }
}
