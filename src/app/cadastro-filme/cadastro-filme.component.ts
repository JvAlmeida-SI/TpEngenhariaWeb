import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-filme',
  templateUrl: './cadastro-filme.component.html',
  styleUrls: ['./cadastro-filme.component.css']
})
export class CadastroFilmeComponent implements OnInit {
  cadastroForm: FormGroup;
    listMovies: any[] = [];
    movie: any = {
      title: '',
      synopsis: '',
      duration: '',
      minimumAge: '',
      genreID: '',
    };
    editingUser: any = null;
  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.cadastroForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      minimumAge: ['', [Validators.required]],      
      genreID: ['', [Validators.required]],      
      director: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  // Fetch all items
  fetchMovies(): void {
    this.apiService.getData('movies').subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        console.error('Erro ao buscar itens:', error);
      }
    );
  }

  addMovie(): void {
    console.log(this.cadastroForm.value);
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value; // Obtém os valores do formulário
      this.apiService.postData('movie', formData).subscribe(
        (data) => {this.cadastroForm.reset(); // Reseta o formulário
          console.log('Filme adicionado com sucesso:', data);
        },
        (error) => {
          console.error('Erro ao adicionar filme:', error);
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

  // updateMovie(): void {
  //   if (this.editingItem) {
  //     this.apiService.updateData(this.editingItem.id, this.editingItem).subscribe(
  //       (data) => {
  //         const index = this.movie.findIndex((i) => i.id === this.editingItem.id);
  //         if (index !== -1) {
  //           this.movie[index] = data;
  //         }
  //         this.editingItem = null; // Fecha o modo de edição
  //       },
  //       (error) => {
  //         console.error('Erro ao atualizar item:', error);
  //       }
  //     );
  //   }
  // }

  // Delete item
  deleteMovie(id: string): void {
    this.apiService.deleteData('movie', id).subscribe(
      () => {
        this.movie = this.movie.filter((item) => item.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar item:', error);
      }
    );
  }
}
