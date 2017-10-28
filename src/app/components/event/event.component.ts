import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [EventService]
})
export class EventComponent implements OnInit {
  public eventInfo: any = {};
  public mapsUrl: any;

  constructor(
    private _eventService: EventService,
    private _sanitizer: DomSanitizer,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._activatedRoute.params
      .switchMap((params: Params) => {
        const eventId = params['eventId'];
        return this._eventService.getEventInfo(eventId);
      })
      .subscribe(res => {
        this.eventInfo = res;
        this.mapsUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.google.com/maps/embed/v1/place?key=AIzaSyD5FcofhLUUZRQi-IbPF18sWLlmT3QsytI&q=
          ${this.eventInfo.placeName},${this.eventInfo.formattedAddress}`
        );
      });
  }
}
