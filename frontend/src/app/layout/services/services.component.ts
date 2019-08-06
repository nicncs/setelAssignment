import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ServicesService } from './services.service';
import { interval, empty, Observable, Subscription } from 'rxjs';
import { map, switchMap, takeWhile, catchError, flatMap } from 'rxjs/operators';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
    animations: [routerTransition()],
    providers: [ServicesService]
})
export class ServicesComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    constructor(private service: ServicesService) {}

    services = {
        'api-gateway': true,
        'order-service': true,
        'payment-service': true
    };

    ngOnInit() {
        this.subscriptions.push(
            this.updateStatus(this.service.getGatewayStatus(), 'api-gateway'),
            this.updateStatus(
                this.service.getOrderServiceStatus(),
                'order-service'
            ),
            this.updateStatus(
                this.service.getPaymentServiceStatus(),
                'payment-service'
            )
        );
    }

    ngOnDestroy() {
        this.subscriptions.map(subscription => subscription.unsubscribe());
    }

    updateStatus(observable: Observable<any>, name) {
        return interval(5000)
            .pipe(flatMap(() => observable))
            .subscribe(x => {
                if (!x) {
                    this.services[name] = false;
                } else {
                    this.services[name] = true;
                }
            });
    }
}
