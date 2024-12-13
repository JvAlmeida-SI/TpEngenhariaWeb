import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  items: any[] = [];
  newItem: any = {
    name: '',
    price: 0,
  };
  
  editingItem: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }   

  // Fetch all items
  fetchProducts(): void {
    this.apiService.getData('products').subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error('Erro ao buscar itens:', error);
      }
    );
  }

  // Create item
  addProduct(): void {
    this.apiService.postData('product', this.newItem).subscribe(
      (data) => {
        this.items.push(data);
        this.newItem = {}; // Limpa o formulário
      },
      (error) => {
        console.error('Erro ao adicionar item:', error);
      }
    );
  }

  // Edit item
  editItem(item: any): void {
    this.editingItem = { ...item }; // Cria uma cópia para edição
  }

  updateProduct(): void {
    if (this.editingItem) {
      this.apiService.updateData(this.editingItem.id, this.editingItem).subscribe(
        (data) => {
          const index = this.items.findIndex((i) => i.id === this.editingItem.id);
          if (index !== -1) {
            this.items[index] = data;
          }
          this.editingItem = null; // Fecha o modo de edição
        },
        (error) => {
          console.error('Erro ao atualizar item:', error);
        }
      );
    }
  }

  // Delete item
  deleteProduct(id: string): void {
    this.apiService.deleteData('product', id).subscribe(
      () => {
        this.items = this.items.filter((item) => item.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar item:', error);
      }
    );
  }  

}
