import { Component, OnInit } from '@angular/core';
import { Communication } from '../../model/communication';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messages: Communication[] = [];

  constructor() {}

  ngOnInit() {
    for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
      const message = new Communication();
      message.sendDate = new Date();
      message.text = `aifubiaubibadf di bsfliabsdasb dkf kuadvfukaudvf kuvaudvkua vd`;
      if (Math.floor(i % 2) === 0) {
        message.sentFrom = '2';
      } else {
        message.sentFrom = '4';
      }
      this.messages.push(message);
    }
  }
}
