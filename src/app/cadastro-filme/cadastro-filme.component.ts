import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-filme',
  templateUrl: './cadastro-filme.component.html',
  styleUrls: ['./cadastro-filme.component.css']
})
export class CadastroFilmeComponent implements OnInit {
  registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group({
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
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      const formData = this.registerForm.value; // Obtém os valores do formulário
      this.apiService.postData('movie', formData).subscribe(
        (data) => {this.registerForm.reset(); // Reseta o formulário
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
