import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { CartazComponent } from './cartaz/cartaz.component';
import { PromocoesComponent } from './promocoes/promocoes.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './/app-routing.module';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';


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
    CadastroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
