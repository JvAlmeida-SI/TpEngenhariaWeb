import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cartaz',
  templateUrl: './cartaz.component.html',
  styleUrls: ['./cartaz.component.css']
})
export class CartazComponent implements OnInit {
  movies: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchMovies();
  }

  // GET - Busca todos os filmes
  fetchMovies(): void {
    this.apiService.getData('movies').subscribe(
      (data) => {        
        console.log(data);
        this.movies = data;
      },
      (error) => {
        console.error('Erro ao buscar filmes:', error);
      }
    );
  }
}
