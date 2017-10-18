import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommunicationService } from '../../service/communication.service';
import { Communication } from '../../model/communication';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [CommunicationService]
})
export class MessagesComponent implements OnInit {
  private groupId: string;
  public messages: Communication[] = [];
  public communication: Communication = new Communication();
  private recipient: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _communicationService: CommunicationService
  ) {}

  ngOnInit() {
    this._activatedRoute.params
      .switchMap((params: Params) => {
        this.groupId = params['groupId'];
        return this._communicationService.getMessages(this.groupId);
      })
      .subscribe(res => {
        this.messages = res;
        const comm = res[0];
        if (comm.sentFrom == '2') {
          this.recipient = comm.sentTo;
        } else {
          this.recipient = comm.sentFrom;
        }
      });
  }

  public answer(): void {
    this.communication.group = this.groupId;
    this.communication.sentFrom = '2';
    this.communication.sentTo = this.recipient;
    this.communication.sendDate = new Date().getTime();
    this._communicationService
      .sendCommunication(this.communication)
      .subscribe(res => {
        this.messages.push(JSON.parse(JSON.stringify(this.communication)));
        this.communication = new Communication();
      });
  }
}
