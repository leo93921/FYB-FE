import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRepoService } from '../../service/shared/user-repo.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private _router: Router, private _userRepo: UserRepoService) {}

  ngOnInit() {
    this._userRepo.clearCookies();
    this.goToHomepage();
  }

  private goToHomepage(): void {
    this._router.navigateByUrl('/');
  }
}
