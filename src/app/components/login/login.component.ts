import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../../service/user-management.service';
import { MessageService } from '../../service/message.service';

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
    private _router: Router
  ) {}

  ngOnInit() {}

  public login(): void {
    this._userManagementService
      .login(this.username, this.password)
      .subscribe(res => {
        if (!res) {
          this._messageService.showError(
            'Credenziali errate',
            'Ricontrolla le credenziali, assicurati che siano corrette e riprova. '
          );
        } else {
          this._router.navigate([`/profile`]);
        }
      });
  }
}
