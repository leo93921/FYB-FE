import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../../service/user-management.service';
import { EventService } from '../../service/event.service';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css'],
  providers: [UserManagementService, EventService]
})
export class ActionListComponent implements OnInit {
  public actions: any[] = [];
  private selectedRequest: any;
  public feedbackItem: any = {};
  @ViewChild('feedbackModal') private feedbackModal: any;
  @ViewChild('paypalModal') private paypalModal: any;
  public todayDate: number = (new Date()).getTime();
  public redirectingToPaypal: boolean;

  constructor(
    private _userManager: UserManagementService,
    private _eventService: EventService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.refreshActions();
  }

  private refreshActions(): void {
    this._eventService.getEventsForUser().subscribe(res => {
      this.actions = res;
    });
  }

  public openModal(item) {
    this.selectedRequest = item;
    this.feedbackModal.open();
  }

  public saveFeedback(): void {
    this.feedbackItem.eventId = this.selectedRequest.eventId;
    this._userManager
      .saveFeedback(this.selectedRequest.otherUserId, this.feedbackItem)
      .subscribe(res => {
        this.refreshActions();
        this.feedbackModal.dismiss();
      });
  }

  public goToEvent(item): void {
    this._router.navigateByUrl(`/event/${item.eventId}/${item.name.replace(' ', '-')}`);
  }

  public approve(): void {
    this._eventService.approve(this.selectedRequest.messageGroup, true).subscribe(res => {
      this.redirectingToPaypal = true;
      window.location.href = res;
    });
  }

  public openPayPalModal(item: any): void {
    this.selectedRequest = item;
    this.paypalModal.open();
  }
}
