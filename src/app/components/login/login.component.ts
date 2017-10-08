import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../service/user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserManagementService]
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(private _userManagementService: UserManagementService) {}

  ngOnInit() {}

  public login(): void {
    this._userManagementService
      .login(this.username, this.password)
      .subscribe(res => console.log(res));
  }
}
