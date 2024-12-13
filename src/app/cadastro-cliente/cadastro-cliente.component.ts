import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  cadastroForm: FormGroup;
  listClient: any[] = [];
  client: any = {
    fistName: '',
    lastName: '',
    cpf: '',
    password: '',
    passwordConfirmation: '',
  };
  editingItem: any = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.cadastroForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  fetchClient(): void {
    this.apiService.getData('clients').subscribe(
      (data) => {
        console.log(data);
        data.forEach(d => {
          if (d.cpf === this.cadastroForm.get('cpf').value){
          this.cadastroForm.get('firstName').setValue(d.firstName);
          this.cadastroForm.get('lastName').setValue(d.lastName);
          this.cadastroForm.get('password').setValue(d.password);
          }          
        });        
      },
      (error) => {
        console.error('Erro ao buscar cliente:', error);
      }
    );
  }

  // POST - Adiciona um novo usuário
  addUser(): void {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value; // Obtém os valores do formulário
      console.log(formData);
      this.apiService.postData('client', formData).subscribe(
        (data) => {
          this.listClient.push(data);
          this.cadastroForm.reset();
          console.log('Cliente adicionado com sucesso:', data);
        },
        (error) => {
          console.error('Erro ao adicionar cliente:', error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  // Edit item
  editItem(item: any): void {
    this.editingItem = { ...item }; // Cria uma cópia para edição
  }

  updateUser(): void {
    if (this.editingItem) {
      this.apiService.updateData(this.editingItem.id, this.editingItem).subscribe(
        (data) => {
          const index = this.client.findIndex((i) => i.id === this.editingItem.id);
          if (index !== -1) {
            this.client[index] = data;
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
        this.client = this.client.filter((item) => item.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar item:', error);
      }
    );
  }
}
