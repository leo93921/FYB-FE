import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../../service/user-management.service';
import { MessageService } from '../../service/message.service';
import { UserRepoService } from '../../service/shared/user-repo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserManagementService, MessageService]
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private _userManagementService: UserManagementService,
    private _messageService: MessageService,
    private _router: Router,
    private _userRepo: UserRepoService
  ) {}

  ngOnInit() {
    this._userRepo.clearCookies();
  }

  public login(): void {
    this._userManagementService
      .login(this.username, this.password)
      .subscribe(res => {
        if (!res) {
          this._messageService.showError(
            'Credenziali errate',
            'Ricontrolla le credenziali, assicurati che siano corrette e riprova. '
          );
          this._userRepo.isConnected = false;
        } else {
          this._userRepo.isConnected = true;
          this._userRepo.connecterUser = this._userRepo.getCookieValue(
            UserRepoService.USER_EMAIL
          );
          this._router.navigate([`/profile`]);
        }
      });
  }
}
