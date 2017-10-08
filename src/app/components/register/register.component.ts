import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UtilsService } from '../../service/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UtilsService ]
})
export class RegisterComponent implements OnInit {

  public user: User = new User();

  constructor( private _utils: UtilsService ) { }

  ngOnInit() {
  }

  check() {
    const address = `${this.user.address},${this.user.zipCode},${this.user.city}`;
    this._utils.getCoordinates(address).subscribe(res => {
      this.user.ltd = res.results[0]['geometry']['location']['lat'];
      this.user.lng = res.results[0]['geometry']['location']['lng'];
      this.user.formattedAddress = res.results[0]['formatted_address'];
    });
  }

}
