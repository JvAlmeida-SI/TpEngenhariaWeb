import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  selectedOption: string = '';

  constructor() { }

  ngOnInit() {
  } 

  renderizarCadastro(){
    console.log(this.selectedOption);
  }

  onOptionChange(event : Event) { 
    const selectElement = event.target as HTMLSelectElement; 
    this.selectedOption = selectElement.value;
    console.log('Opção selecionada mudou:', this.selectedOption); 
  }
}
