import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { CartazComponent } from './cartaz/cartaz.component';
import { PromocoesComponent } from './promocoes/promocoes.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastroFilmeComponent } from './cadastro-filme/cadastro-filme.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { CadastroColaboradorComponent } from './cadastro-colaborador/cadastro-colaborador.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LancamentoComponent,
    CartazComponent,
    PromocoesComponent,
    CadastroComponent,
    HomePageComponent,
    CadastroFilmeComponent,
    CadastroProdutoComponent,
    CadastroClienteComponent,
    CadastroColaboradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
