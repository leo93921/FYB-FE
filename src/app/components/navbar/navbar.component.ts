import { Component, OnInit } from '@angular/core';
import { UserRepoService } from '../../service/shared/user-repo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public notConnected: boolean;
  public userName: string = '';

  constructor(public _userRepo: UserRepoService) {}

  ngOnInit() {
    this.notConnected = !(
      this._userRepo.getCookieValue(UserRepoService.USER_ID) &&
      this._userRepo.getCookieValue(UserRepoService.USER_EMAIL)
    );
    if (!this.notConnected) {
      setTimeout(() => {
        this.userName = this._userRepo.getCookieValue(
          UserRepoService.USER_EMAIL
        );
      }, 0);
    }
  }
}
