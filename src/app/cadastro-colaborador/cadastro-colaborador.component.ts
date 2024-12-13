import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';	

@Component({
  selector: 'app-cadastro-colaborador',
  templateUrl: './cadastro-colaborador.component.html',
  styleUrls: ['./cadastro-colaborador.component.css']
})
export class CadastroColaboradorComponent implements OnInit {
  cadastroForm: FormGroup;
  listEmployee: any[] = [];
  employee: any = {
    name: '',
    lastName: '',
    cpf: '',
    password: '',
    passwordConfirmation: '',
  };
  editingUser: any = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.cadastroForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      isAdmin: [false, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],      
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]],
      admin: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  // GET - Busca todos os usuários
  fetchUsers(): any {
    this.apiService.getData('employee').subscribe(
      (data) => {
        this.employee.firstName = data[0].firstName;        
        this.employee.lastName = data.lastName;
        this.employee.cpf = data.cpf;
        this.employee.password = data.password;
        this.employee.passwordConfirmation = data.passwordConfirmation;

        return this.employee;
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  // POST - Adiciona um novo usuário
  addUser(): void {
    if (this.cadastroForm.valid) {
      if (this.cadastroForm.value.isAdmin){
        this.cadastroForm.value.admin = true;
      }

      const formData = this.cadastroForm.value; // Obtém os valores do formulário
      console.log(formData);
      this.apiService.postData('employee', formData).subscribe(
        (data) => {
          this.listEmployee.push(data); // Adiciona o novo usuário à lista
          this.cadastroForm.reset(); // Reseta o formulário
          console.log('Usuário adicionado com sucesso:', data);
        },
        (error) => {
          console.error('Erro ao adicionar usuário:', error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  // PUT - Atualiza um usuário existente
  updateUser(): void {
    if (this.editingUser) {
      this.apiService.updateData('employees', this.editingUser.id).subscribe(
        (data) => {
          const index = this.listEmployee.findIndex((u) => u.id === this.editingUser.id);
          if (index !== -1) {
            this.listEmployee[index] = data; // Atualiza o usuário na lista
          }
          this.editingUser = null; // Sai do modo de edição
          console.log('Usuário atualizado:', data);
        },
        (error) => {
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    }
  }

  // DELETE - Remove um usuário
  deleteUser(id: string): void {
    this.apiService.deleteData('employee', id).subscribe(
      () => {
        this.listEmployee = this.listEmployee.filter((u) => u.id !== id); // Remove o usuário da lista
        console.log('Usuário removido:', id);
      },
      (error) => {
        console.error('Erro ao remover usuário:', error);
      }
    );
  }

  // Seleciona um usuário para edição
  selectUserForEditing(user: any): void {
    this.editingUser = { ...user }; // Cria uma cópia do usuário para edição
  }
}
