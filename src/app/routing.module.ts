import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './service/shared/auth-guard.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventComponent } from './components/event/event.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ElaboratePaymentComponent } from './components/payments/elaborate-payment/elaborate-payment.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event/:eventId/:eventName', component: EventComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user/:userId', component: UserProfileComponent },
  {
    path: 'messages',
    component: MessageListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'messages/:groupId',
    component: MessagesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'elaborate/:groupId',
    component: ElaboratePaymentComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {}
