import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MediaContainer } from '../../model/media-container';
import { Messages } from '../../model/messages';
import { MediaManagementService } from '../../service/media-management.service';
import { DomainService } from '../../service/domain.service';
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
    UtilsService,
    DomainService
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  public modalOpen = false;
  private userId: string;
  public user: UserProfile = new UserProfile();
  private mediaContainer: MediaContainer = new MediaContainer();
  public fileNotSelected = true;
  public fileName: string;
  private file: any;
  @ViewChild(BsModalComponent) private modal: BsModalComponent;
  public addImage: boolean = false;
  public domains: any[] = [];
  public tracks: any[] = [];
  public images: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _mediaManagement: MediaManagementService,
    private _messageService: MessageService,
    private _userManager: UserManagementService,
    private _utils: UtilsService,
    private _domainService: DomainService
  ) {}

  ngOnInit() {
    this._activatedRoute.params
      .switchMap((params: Params) => {
        this.mediaContainer.userId = params['userId'];
        this.userId = params['userId'];
        this.refreshGenericData();
        this.refreshTracks();
        this.refreshImages();
        return this._domainService.getDomain('price_band');
      })
      .subscribe(res => {
        this.domains = res;
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

  private refreshImages() {
    this.subscriptions[4] = this._mediaManagement
      .getMedia(this.userId, Constants.IMAGE_FILES)
      .subscribe(res => {
        this.images = res;
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
      .switchMap(res => {
        if (res.status === Constants.GOOGLE_COORD_NO_RESULTS) {
          this._messageService.showError(
            Messages.GOOGLE_NO_COORD_RESULTS_TITLE,
            Messages.GOOGLE_NO_COORD_RESULTS_MESSAGE
          );
          return;
        }
        this.user.ltd = res.results[0]['geometry']['location']['lat'];
        this.user.lng = res.results[0]['geometry']['location']['lng'];
        this.user.formattedAddress = res.results[0]['formatted_address'];
        return this._userManager.saveGenericData(this.userId, this.user);
      })
      .subscribe(() => {});
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
        this.mediaContainer.title = '';
        this.mediaContainer.userId = this.userId;
        this.fileName = '';
        this.fileNotSelected = true;
        if (this.addImage) {
          this.refreshImages();
        } else {
          this.refreshTracks();
        }
      });
  }

  public selectMedia(event): void {
    if (event.srcElement.files && event.srcElement.files.length > 0) {
      this.file = event.srcElement.files[0];
      this.fileName = this.file.name;
      this.mediaContainer.mimeType = this.file.type;
      this.mediaContainer.size = this.file.size;
      this.mediaContainer.media = this.file;
      this.fileNotSelected = false;
    } else {
      this.fileNotSelected = true;
    }
  }

  public getTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes}:${seconds}`;
  }

  public deleteMedia(mediaId: string, isImage: boolean) {
    this._mediaManagement.deleteMedia(mediaId).subscribe(res => {
      if (isImage) {
        this.refreshImages();
      } else {
        this.refreshTracks();
      }
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
  formattedAddress: string;
  ltd: string;
  lng: string;
}
