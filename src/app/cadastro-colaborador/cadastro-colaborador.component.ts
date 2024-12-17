import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';	

@Component({
  selector: 'app-cadastro-colaborador',
  templateUrl: './cadastro-colaborador.component.html',
  styleUrls: ['./cadastro-colaborador.component.css']
})
export class CadastroColaboradorComponent implements OnInit {
  registerForm: FormGroup;
  listEmployee: any[] = [];
  employee: any = {
    firstName: '',
    lastName: '',
    cpf: '',
    password: '',
    passwordConfirmation: '',
  };
  editingUser: any = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.registerForm = this.formBuilder.group({
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

  // GET - Busca usuário
  fetchEmployee(): void {
    this.apiService.getData('employees').subscribe(
      (data) => {
        data.forEach(d => {
          if (d.cpf === this.registerForm.get('cpf').value){
          console.log(d);
          this.registerForm.get('firstName').setValue(d.firstName);
          this.registerForm.get('lastName').setValue(d.lastName);
          this.registerForm.get('isAdmin').setValue(d.isAdmin);
          }          
        });        
      },
      (error) => {
        console.error('Erro ao buscar colaborador:', error);
      }
    );
  }

  // POST - Adiciona um novo usuário
  addUser(): void {
    if (this.registerForm.valid) {
      if (this.registerForm.value.isAdmin){
        this.registerForm.value.admin = true;
      }

      const formData = this.registerForm.value; // Obtém os valores do formulário
      this.apiService.postData('employee', formData).subscribe(
        (data) => {
          this.registerForm.reset(); // Reseta o formulário
          console.log('Colaborador adicionado com sucesso:', data);
        },
        (error) => {
          console.error('Erro ao adicionar colaborador:', error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}