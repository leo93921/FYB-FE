import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService } from '../../../service/event.service';

@Component({
  selector: 'app-elaborate-payment',
  templateUrl: './elaborate-payment.component.html',
  styleUrls: ['./elaborate-payment.component.css'],
  providers: [EventService]
})
export class ElaboratePaymentComponent implements OnInit {
  private payerID: string;
  private paymentId: string;
  private messageGroup: string;
  private fromAction: boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _eventService: EventService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._activatedRoute.queryParams
      .switchMap((params: Params) => {
        this.payerID = params['PayerID'];
        this.paymentId = params['paymentId'];
        this.fromAction = params['fromAction'];
        return this._activatedRoute.params;
      })
      .switchMap((params: Params) => {
        this.messageGroup = params['groupId'];
        const payInfo: any = {
          messageGroup: this.messageGroup,
          payerID: this.payerID,
          paymentId: this.paymentId
        };
        return this._eventService.executePayment(payInfo);
      })
      .subscribe(res => {
        if (this.fromAction) {
          this._router.navigateByUrl(`/actions`);
        } else {
          this._router.navigateByUrl(`/messages/${this.messageGroup}`);
        }
      });
  }
}
