import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Constants } from '../../constants';
import { CommunicationService } from '../../service/communication.service';
import { EventService } from '../../service/event.service';
import { MessageService } from '../../service/message.service';
import { UserRepoService } from '../../service/shared/user-repo.service';
import { Communication } from '../../model/communication';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [CommunicationService, EventService, MessageService]
})
export class MessagesComponent implements OnInit, OnDestroy {
  private userId: string;
  private groupId: string;
  public messages: Communication[] = [];
  public communication: Communication = new Communication();
  private recipient: string;
  public offer: any = {};
  @ViewChild('modal') private offerModal: any;
  public anOfferExist: boolean;
  public isAGroup: boolean;
  public messagingUser: string;

  // TODO Add the subscriptions
  private subscriptions: Subscription[] = [];

  public OPEN_AS_ACCEPT_OFFER = 1;
  public OPEN_AS_MODIFY_OFFER = 2;
  public modalMode: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _communicationService: CommunicationService,
    private _eventService: EventService,
    private _messageService: MessageService,
    private _userRepoService: UserRepoService
  ) {}

  ngOnInit() {
    this.userId = this._userRepoService.getCookieValue(UserRepoService.USER_ID);
    this.isAGroup =
      this._userRepoService.getCookieValue(UserRepoService.USER_TYPE) ===
      Constants.USER_GROUP_TYPE;
    this._activatedRoute.params
      .switchMap((params: Params) => {
        this.groupId = params['groupId'];
        return this._communicationService.getMessages(this.groupId);
      })
      .subscribe(res => {
        this.refreshOffer();
        this.messages = res.messages;
        this.messagingUser = res.name;
        const comm = this.messages[0];
        if (comm.sentFrom == this.userId) {
          this.recipient = comm.sentTo;
        } else {
          this.recipient = comm.sentFrom;
        }
      });
  }

  ngOnDestroy() {
    for (const item of this.subscriptions) {
      if (item && !item.closed) {
        item.unsubscribe();
      }
    }
  }

  public answer(): void {
    this.communication.group = this.groupId;
    this.communication.sentFrom = this.userId;
    this.communication.sentTo = this.recipient;
    this.communication.sendDate = new Date().getTime();
    this.subscriptions[1] = this._communicationService
      .sendCommunication(this.communication)
      .subscribe(res => {
        this.messages.push(JSON.parse(JSON.stringify(this.communication)));
        this.communication = new Communication();
      });
  }

  private refreshOffer(openModal: boolean = false): void {
    this.subscriptions[0] = this._eventService
      .getOffer(this.groupId)
      .subscribe(res => {
        if (!res) {
          this.offer = {};
          if (this.isAGroup) {
            this.offer.groupId = this.userId;
            this.offer.placeId = 5;
          } else {
            this.offer.groupId = 5;
            this.offer.placeId = this.userId;
          }
          this.anOfferExist = false;
        } else {
          this.anOfferExist = true;
          this.offer = res;
          this.offer.date = new Date(res.date);
        }
        if (openModal) {
          this.offerModal.open();
        }
      });
  }

  public openModal(openType: number) {
    this.modalMode = openType;
    this.refreshOffer(true);
  }

  private sendOffer() {
    const offerToSend = JSON.parse(JSON.stringify(this.offer));
    offerToSend.date = new Date(offerToSend.date).getTime();
    this.subscriptions[2] = this._eventService
      .makeOffer(this.groupId, offerToSend)
      .subscribe(res => {
        if (!res) {
          this._messageService.showError(
            `Impossibile inviare l'offerta`,
            `&Egrave stato impossibile salvare l'offerta in quanto l'utente ha già accettato quella precente.`
          );
        } else {
          this._messageService.showSuccess(
            'Perfetto',
            `L'offerta è stata salvata con successo`
          );
          this.offerModal.close();
        }
      });
  }

  public accept(): void {
    this._eventService.acceptOffer(this.groupId).subscribe(res => {
      this._messageService.showSuccess(
        'Congratulazioni',
        `Congratulazioni, hai accettato l'offerta. Non appena il proprietario del locale
        effettuerà il pagamento, te lo faremo sapere. Puoi controllare lo stato dell'evento
        cliccando sulla voce <b>Eventi</b> del menu.`
      );
      this.offer.accepted = true;
      this.offerModal.close();
    });
  }

  public approve(): void {
    this._eventService.approve(this.groupId).subscribe(res => {
      window.location.href = res;
    });
  }
}
