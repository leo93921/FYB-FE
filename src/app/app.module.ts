import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RoutingModule } from './routing.module';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import { BsModalModule } from 'ng2-bs3-modal';

import { AuthGuardService } from './service/shared/auth-guard.service';
import { CustomHttpService } from './service/custom-http.service';
import { UserRepoService } from './service/shared/user-repo.service';
import { HttpFactory } from './http-factory';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventComponent } from './components/event/event.component';
import { LoadingDisplayComponent } from './components/shared/loading-display/loading-display.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Ng2AudioPlayerComponent } from './components/shared/ng2-audio-player/ng2-audio-player.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ToDatePipe } from './pipes/to-date.pipe';
import { LogoutComponent } from './components/logout/logout.component';
import { HomepageComponent } from './components/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EventComponent,
    LoadingDisplayComponent,
    ProfileComponent,
    UserProfileComponent,
    Ng2AudioPlayerComponent,
    MessagesComponent,
    MessageListComponent,
    ToDatePipe,
    LogoutComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpModule,
    CarouselModule.forRoot(),
    ToastyModule.forRoot(),
    BsModalModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    {
      provide: Http,
      useFactory: HttpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    ToastyService,
    AuthGuardService,
    UserRepoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
