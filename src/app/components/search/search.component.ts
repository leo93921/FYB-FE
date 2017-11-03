import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { UserManagementService } from '../../service/user-management.service';
import { SearchService } from '../../service/search.service';
import { UtilsService } from '../../service/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserManagementService, SearchService, UtilsService]
})
export class SearchComponent implements OnInit {
  public address: string;
  public previousAddress: string;
  public searchObject: any = {position: {}};
  public results: any[] = [];

  constructor(
    private _userService: UserManagementService,
    private _searchService: SearchService,
    private _utils: UtilsService
  ) { }

  ngOnInit() {
  }

  public getCurrentPosition(): void {
    this._userService.getCurrentPosition().subscribe(res => {
      this.address = res;
    });
  }


  public searchResults(): void {
    if (this.address === '') {
      this.searchObject.position = {};
    }
    Observable.forkJoin(
      this.address && this.address !== this.previousAddress ?
      this._utils.getCoordinates(this.address) :
      Observable.of(true)
    ).switchMap(res => {
      if (res[0]['results']) {
        const coords = res[0].results[0].geometry.location;
        this.searchObject.position.ltd = coords['lat'];
        this.searchObject.position.lng = coords['lng'];
      }
      return this._searchService.doSearch(this.searchObject);
    }).subscribe(res => {
      this.results = res;
    });
  }

}
