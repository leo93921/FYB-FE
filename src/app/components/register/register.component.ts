import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user';
import { UtilsService } from '../../service/utils.service';
import { UserManagementService } from '../../service/user-management.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UtilsService, UserManagementService, MessageService]
})
export class RegisterComponent implements OnInit {
  public user: User = new User();
  public secondPassword: string;
  public invalidPassword: boolean;

  constructor(
    private _utils: UtilsService,
    private _userManagementService: UserManagementService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {}

  public checkPasswordValidity() {
    this.invalidPassword = this.user.password !== this.secondPassword;
  }

  registerUser() {
    const address = `${this.user.address},${this.user.zipCode},${this.user
      .city}`;
    this._utils
      .getCoordinates(address)
      .switchMap(res => {
        this.user.ltd = res.results[0]['geometry']['location']['lat'];
        this.user.lng = res.results[0]['geometry']['location']['lng'];
        this.user.formattedAddress = res.results[0]['formatted_address'];
        return Observable.of(true);
      })
      .switchMap(() => {
        return this._userManagementService.register(this.user);
      })
      .subscribe(res => {
        if (res) {
          this._messageService.showSuccess(
            'Utente registrato con successo',
            ''
          );
        } else {
          this._messageService.showError(
            'Credenziali errate',
            'riprova e controlla '
          );
        }
      });
  }
}
