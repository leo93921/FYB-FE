import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CommunicationService } from '../../service/communication.service';
import { UserRepoService } from '../../service/shared/user-repo.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [CommunicationService]
})
export class MessageListComponent implements OnInit, OnDestroy {
  private userId: string;
  public messages: any[] = [];
  private subscription: Subscription;

  constructor(
    private _communicationService: CommunicationService,
    private _userRepo: UserRepoService
  ) {}

  ngOnInit() {
    this.userId = this._userRepo.getCookieValue(UserRepoService.USER_ID);
    this.subscription = this._communicationService
      .getMessagesForUser()
      .subscribe(res => {
        this.messages = res;
      });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
