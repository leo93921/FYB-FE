import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from '../../service/user-management.service';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css'],
  providers: [UserManagementService]
})
export class ActionListComponent implements OnInit {
  public actions: any[] = [];
  private selectedRequest: any;
  public feedbackItem: any = {};
  @ViewChild('feedbackModal') private feedbackModal: any;

  constructor(private _userManager: UserManagementService) {}

  ngOnInit() {
    this.refreshActions();
  }

  private refreshActions(): void {
    this._userManager.getActions().subscribe(res => {
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
      .saveFeedback(this.selectedRequest.userId, this.feedbackItem)
      .subscribe(res => {
        this.refreshActions();
        this.feedbackModal.dismiss();
      });
  }
}
