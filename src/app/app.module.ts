import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RoutingModule } from './routing.module';

import { CustomHttpService } from './service/custom-http.service';
import { HttpFactory } from './http-factory';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventComponent } from './components/event/event.component';
import { LoadingDisplayComponent } from './components/shared/loading-display/loading-display.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EventComponent,
    LoadingDisplayComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpModule,
    CarouselModule.forRoot()
  ],
  providers: [
    {
      provide: Http,
      useFactory: HttpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
