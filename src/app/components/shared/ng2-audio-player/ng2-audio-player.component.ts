import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  EventEmitter,
  AfterContentInit,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-ng2-audio-player',
  templateUrl: './ng2-audio-player.component.html',
  styleUrls: ['./ng2-audio-player.component.css']
})
export class Ng2AudioPlayerComponent
  implements OnInit, AfterContentInit, OnDestroy {
  public displayPlaylist: boolean = false;
  public isPlaying: boolean = false;
  private audioDuration: number;
  public viewAudioDuration: string = '00:00';
  private currentTime: number;
  public viewCurrentTime: string = '00:00';
  public completedPercentage: number = 0;
  private bufferPercentage: number = 0;
  private isReadyForPlay: boolean = false;

  private loadedMetadata: EventEmitter<void> = new EventEmitter<void>();
  private timeUpdate: EventEmitter<void> = new EventEmitter<void>();
  private progress: EventEmitter<void> = new EventEmitter<void>();
  private loadStart: EventEmitter<void> = new EventEmitter<void>();
  private loadEnd: EventEmitter<void> = new EventEmitter<void>();
  private canPlay: EventEmitter<void> = new EventEmitter<void>();

  // start test variables
  public playList: PlayListItem[] = [
    {
      icon: 'http://funkyimg.com/i/21pX5.png',
      title: 'Hitman',
      file:
        'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3',
      artist: 'An artist'
    },
    {
      icon: 'http://funkyimg.com/i/21pX5.png',
      title: 'Forever Believe',
      file:
        'http://www.naijalumia.com/wp-content/uploads/2017/10/Pink_-_Revenge_Ft_Eminem(NaijaLumia.com).mp3',
      artist: 'An artist'
    },
    {
      icon: 'http://funkyimg.com/i/21pX5.png',
      title: 'Drifting',
      file:
        'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3',
      artist: 'An artist'
    },
    {
      icon: 'http://funkyimg.com/i/21pX5.png',
      title:
        'Clap Along (Lorem ipsum dolor sit amet, consectetur adipisicing.)',
      file:
        'http://www.naijalumia.com/wp-content/uploads/2017/10/Pink_-_Revenge_Ft_Eminem(NaijaLumia.com).mp3',
      artist: 'An artist'
    },
    {
      icon: 'http://funkyimg.com/i/21pX5.png',
      title: 'Pop Tune',
      file:
        'http://incompetech.com/music/royalty-free/mp3-royaltyfree/Hitman.mp3',
      artist: 'An artist'
    }
  ];
  private activeAudio = new Audio();
  private activeAudioTitle: string;
  private activeAudioArtist: string;
  private selectedTrackIndex: number = 0;

  private subscriptions: Subscription[] = [];

  // end test variables

  constructor(private _renderer: Renderer2) {
    this._renderer.listen(this.activeAudio, 'loadedmetadata', () => {
      this.loadedMetadata.emit();
    });
  }

  ngOnInit() {
    this.subscriptions[0] = this.loadedMetadata.subscribe(() => {
      this.getActiveAudioInfo();
    });
    this.subscriptions[1] = this.timeUpdate.subscribe(() => {
      this.updateCurrentTime();
    });
    this.subscriptions[2] = this.progress.subscribe(() => {
      this.updateBufferWidth();
    });
    this.subscriptions[3] = this.loadStart.subscribe(() => {
      this.updateBufferWidth();
    });
    this.subscriptions[4] = this.canPlay.subscribe(() => {
      this.isReadyForPlay = true;
    });
    this.subscriptions[5] = this.loadEnd.subscribe(() => {
      this.isReadyForPlay = false;
      this.updateBufferWidth();
    });
  }

  ngAfterContentInit() {
    this.selectTrack(0, true);
  }

  ngOnDestroy() {
    for (const item of this.subscriptions) {
      if (item && !item.closed) {
        item.unsubscribe();
      }
    }
  }

  public selectTrack(index: number, firstTime: boolean = false) {
    this.activeAudio.pause();
    this.activeAudio.currentTime = 0;
    this.completedPercentage = 0;
    this.bufferPercentage = 0;
    this.isPlaying = false;
    const track: PlayListItem = this.playList[index];
    this.selectedTrackIndex = index;
    this.activeAudio = new Audio(track.file);
    this._renderer.listen(this.activeAudio, 'loadedmetadata', () => {
      this.loadedMetadata.emit();
    });
    this._renderer.listen(this.activeAudio, 'loadstart', () => {
      this.loadStart.emit();
    });
    this._renderer.listen(this.activeAudio, 'loadeddata', () => {
      this.loadEnd.emit();
    });
    this._renderer.listen(this.activeAudio, 'canplay', () => {
      this.canPlay.emit();
    });
    this._renderer.listen(this.activeAudio, 'progress', () => {
      this.progress.emit();
    });

    this.activeAudioTitle = track.title;
    this.activeAudioArtist = track.artist;
    this.displayPlaylist = false;

    if (!firstTime) {
      this.togglePlay();
    }
  }

  public togglePlaylistButton(): void {
    this.displayPlaylist = !this.displayPlaylist;
  }

  public togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.activeAudio.play();
      this._renderer.listen(this.activeAudio, 'timeupdate', () => {
        this.timeUpdate.emit();
      });
      this.getActiveAudioInfo();
    } else {
      this.activeAudio.pause();
    }
  }

  public previousSong() {
    const trackIndex = this.selectedTrackIndex - 1;
    if (trackIndex > this.playList.length || trackIndex < 0) {
      return;
    }
    this.selectTrack(trackIndex);
  }

  public nextSong() {
    const trackIndex = this.selectedTrackIndex + 1;
    if (trackIndex > this.playList.length || trackIndex < 0) {
      return;
    }
    this.selectTrack(trackIndex);
  }

  private getActiveAudioInfo() {
    this.audioDuration = this.activeAudio.duration;
    this.viewAudioDuration = this.readableTime(this.audioDuration);
  }

  private updateCurrentTime() {
    this.currentTime = this.activeAudio.currentTime;
    this.viewCurrentTime = this.readableTime(this.currentTime);
    this.completedPercentage = Math.floor(
      this.currentTime / this.audioDuration * 100
    );
  }

  private readableTime(duration: number): string {
    if (Number.isNaN(duration)) {
      return `00:00`;
    }
    const minutes = Math.floor(duration / 60);
    let minuteStr = minutes.toString();
    if (minuteStr.length == 1) {
      minuteStr = `0${minuteStr}`;
    }
    const seconds = Math.floor(duration - minutes * 60);
    let secondsStr = seconds.toString();
    if (secondsStr.length == 1) {
      secondsStr = `0${secondsStr}`;
    }
    return `${minuteStr}:${secondsStr}`;
  }

  private updateBufferWidth() {
    const buffered = this.activeAudio.buffered;
    if (buffered.length == 0) return;
    this.bufferPercentage = Math.round(
      100 * buffered.end(0) / this.activeAudio.duration
    );
  }
}

export class PlayListItem {
  icon: string;
  title: string;
  file: string;
  artist: string;
}
