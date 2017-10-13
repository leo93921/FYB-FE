import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private audio = new Audio('http://www.w3schools.com/html/horse.mp3');
  constructor() {}
  ngOnInit() {}

  public playAudio() {
    this.audio.play();
  }

  public pauseAudio() {
    this.audio.pause();
  }
}
