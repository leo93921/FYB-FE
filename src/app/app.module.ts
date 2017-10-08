import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {RoutingModule} from './routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventComponent } from './components/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
