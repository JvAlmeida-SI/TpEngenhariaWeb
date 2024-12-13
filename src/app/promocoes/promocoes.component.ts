import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-promocoes',
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.css']
})
export class PromocoesComponent implements OnInit {
  products: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  // GET - Busca todos os produtos
  fetchProducts(): void {
    this.apiService.getData('products').subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Erro ao buscar filmes:', error);
      }
    );
  }

}
