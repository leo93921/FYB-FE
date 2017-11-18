import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { UserManagementService } from '../../service/user-management.service';
import { CommunicationService } from '../../service/communication.service';
import { DomainService } from '../../service/domain.service';
import { PlayListItem } from '../shared/ng2-audio-player/ng2-audio-player.component';
import { Communication } from '../../model/communication';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserManagementService, DomainService, CommunicationService]
})
export class UserProfileComponent implements OnInit {
  private userId: string;
  public profile: any = {};
  public priceBand: string;
  public youtubeVideoUrl: any;
  public playlist: PlayListItem[];
  public communication: Communication = new Communication();
  public mapsUrl: SafeResourceUrl;

  constructor(
    private _userManager: UserManagementService,
    private _activatedRoute: ActivatedRoute,
    private _domainService: DomainService,
    private _sanitizer: DomSanitizer,
    private _communicationService: CommunicationService,
    private _router: Router
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
        console.log(this.profile);
        this.fixData(this.profile);
        this.mapsUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.google.com/maps/embed/v1/place?key=AIzaSyD5FcofhLUUZRQi-IbPF18sWLlmT3QsytI&q=
          ${this.profile.name},${this.profile.address}`
        );
        this.priceBand = this.findPriceRange(res[1]);
        this.youtubeVideoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${this.profile.youtube}`
        );
        this.playlist = this.parseMusic();
      });
  }

  private fixData(profile: any) {
    profile.feedbackValue = Math.round(profile.feedbackValue * 100) / 100;
    for (const item of profile.feedbackContainer.counts) {
      if (item.percentage !== 0) {
        item.percentage = Math.round(item.percentage);
      }
    }
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
      track.file = `assets/upload/` + item.url;
      track.title = item.name;
      playlist.push(track);
    }
    return playlist;
  }

  public sendMessage(): void {
    this.communication.sentTo = this.userId;
    this.communication.sentFrom = this.userId;
    this.communication.read = false;
    this.communication.date = Date.parse(this.communication.date);
    this.communication.sendDate = (new Date()).getTime();
    this._communicationService
      .sendCommunication(this.communication)
      .subscribe(res => {
        this._router.navigateByUrl(`/messages/${res}`);
      });
  }
}
