import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { UserManagementService } from '../../service/user-management.service';
import { DomainService } from '../../service/domain.service';
import { PlayListItem } from '../shared/ng2-audio-player/ng2-audio-player.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserManagementService, DomainService]
})
export class UserProfileComponent implements OnInit {
  private userId: string;
  public profile: any = {};
  public priceBand: string;
  public youtubeVideoUrl: any;
  public playlist: PlayListItem[];

  constructor(
    private _userManager: UserManagementService,
    private _activatedRoute: ActivatedRoute,
    private _domainService: DomainService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this._activatedRoute.params
      .switchMap((params: Params) => {
        this.userId = params['userId'];
        return Observable.forkJoin(
          this._userManager.getProfile(this.userId),
          this._domainService.getDomain('price_band')
        );
      })
      .subscribe(res => {
        this.profile = res[0];
        this.priceBand = this.findPriceRange(res[1]);
        this.youtubeVideoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${this.profile.youtube}`
        );
        this.playlist = this.parseMusic();
      });
  }

  private findPriceRange(priceDomain: any[]): string {
    for (const price of priceDomain) {
      if (price.code === this.profile.priceBand) {
        return price.text;
      }
    }
  }

  private parseMusic(): PlayListItem[] {
    const playlist: PlayListItem[] = [];
    for (const item of this.profile.music) {
      const track: PlayListItem = new PlayListItem();
      track.artist = this.profile.name;
      track.file = item.url;
      track.title = item.name;
      playlist.push(track);
    }
    return playlist;
  }
}
