import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MediaContainer } from '../../model/media-container';
import { MediaManagementService } from '../../service/media-management.service';
import { UserManagementService } from '../../service/user-management.service';
import { UtilsService } from '../../service/utils.service';
import { MessageService } from '../../service/message.service';
import { Constants } from '../../constants';
import { BsModalComponent } from 'ng2-bs3-modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    MediaManagementService,
    MessageService,
    UserManagementService,
    UtilsService
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  public modalOpen = false;
  private userId: string;
  public user: UserProfile = new UserProfile();
  private mediaContainer: MediaContainer = new MediaContainer();
  public fileNotSelected = true;
  public fileName: string;
  @ViewChild(BsModalComponent) private modal: BsModalComponent;

  public tracks: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _mediaManagement: MediaManagementService,
    private _messageService: MessageService,
    private _userManager: UserManagementService,
    private _utils: UtilsService
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.mediaContainer.userId = params['userId'];
      this.userId = params['userId'];
      this.refreshGenericData();
      this.refreshTracks();
    });
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    }
  }

  private refreshGenericData() {
    this.subscriptions[1] = this._userManager
      .getGenericData(this.userId)
      .subscribe(res => {
        this.user = res;
      });
  }

  private refreshTracks() {
    this.subscriptions[0] = this._mediaManagement
      .getMedia(this.userId, Constants.AUDIO_FILES)
      .subscribe(res => {
        this.tracks = res;
      });
  }

  public editProfile(): void {
    const address = `${this.user.address}, ${this.user.city}, ${this.user
      .zipCode}`;
    this.subscriptions[3] = this._utils
      .getCoordinates(address)
      .subscribe(res => {
        console.log(res);
      });
    this._userManager
      .saveGenericData(this.userId, this.user)
      .subscribe(res => {});
  }

  public saveMedia(): void {
    this.subscriptions[2] = this._mediaManagement
      .saveMedia(this.mediaContainer)
      .subscribe(saved => {
        if (!saved) {
          this._messageService.showError(
            'Impossibile salvare',
            `La traccia che hai provato a caricare non è stata salvata, ti preghiamo
          di riprovare tra un po'. Se il problema persiste contatta l'amministratore del sito.`
          );
        }
        this.modal.dismiss();
        this.refreshTracks();
      });
  }

  public selectMedia(event): void {
    const file: File = event.srcElement.files[0];
    this.mediaContainer.mimeType = file.type;
    this.mediaContainer.size = file.size;
    this.mediaContainer.media = file;
    this.fileName = file.name;
    this.fileNotSelected = false;
  }

  public getTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}:${seconds}`;
  }

  public deleteMedia(mediaId: string) {
    this._mediaManagement.deleteMedia(mediaId).subscribe(res => {
      this.refreshTracks();
    });
  }
}

export class UserProfile {
  name: string;
  description: string;
  phone: string;
  email: string;
  paypal: string;
  price: string;
  address: string;
  city: string;
  zipCode: string;
  youtube: string;
}
