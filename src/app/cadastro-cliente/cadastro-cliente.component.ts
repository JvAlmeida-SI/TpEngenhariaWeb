import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  items: any[] = [];
  newItem: any = {};
  editingItem: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  // Fetch all items
  fetchUser(): void {
    this.apiService.getData('client').subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error('Erro ao buscar itens:', error);
      }
    );
  }

  // Create item
  addUser(): void {
    this.apiService.postData('client', this.newItem).subscribe(
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

  updateUser(): void {
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
  deleteMovie(id: string): void {
    this.apiService.deleteData('client', id).subscribe(
      () => {
        this.items = this.items.filter((item) => item.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar item:', error);
      }
    );
  }
}
