import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  listPerson: any[] = [];
  person: any = {
    fistName: '',
    lastName: '',
    cpf: '',
    password: '',
    passwordConfirmation: '',
  };
  editingItem: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  // Fetch all items
  fetchUser(): void {
    this.apiService.getData('client').subscribe(
      (data) => {
        this.person = data;
      },
      (error) => {
        console.error('Erro ao buscar itens:', error);
      }
    );
  }

  // Create item
  addUser(): void {
    this.apiService.postData('client', this.person).subscribe(
      (data) => {
        this.person.push(data);
        this.person = {}; // Limpa o formulário
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
          const index = this.person.findIndex((i) => i.id === this.editingItem.id);
          if (index !== -1) {
            this.person[index] = data;
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
        this.person = this.person.filter((item) => item.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar item:', error);
      }
    );
  }
}
