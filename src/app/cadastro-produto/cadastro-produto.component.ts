import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  registerForm: FormGroup;
  items: any[] = [];
  newItem: any = {
    name: '',
    price: 0,
  };
  
  editingItem: any = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        quantity: [10, [Validators.required]],
      });
    }

  ngOnInit(): void {
    this.fetchProducts();
  }   

  // Fetch all items
  fetchProducts(): void {
    this.apiService.getData('products').subscribe(
      (data) => {
        this.registerForm.get('name').setValue(data.name);
        this.registerForm.get('price').setValue(data.price);
      },
      (error) => {
        console.error('Erro ao buscar itens:', error);
      }
    );
  }

  // Create item
  addProduct(): void {
    this.apiService.postData('product', this.registerForm.value).subscribe(
      (data) => {
        console.log('Produto adicionado com sucesso: ' + data);
        this.registerForm.reset();
      },
      (error) => {
        console.error('Erro ao adicionar item:', error);
      }
    );
  }


  // Delete item
  deleteProduct(id: string): void {
    this.apiService.deleteData('product', this.registerForm.get('name').value).subscribe(
      () => {
        this.items = this.items.filter((item) => item.id !== id);
      },
      (error) => {
        console.error('Erro ao deletar item:', error);
      }
    );
  }  

}
