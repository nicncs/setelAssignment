import {
    Component,
    OnInit,
    ViewChild,
    ChangeDetectorRef,
    AfterViewInit
} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { OrdersService } from './orders.service';
import { Order } from './interface/order.interface';
import {
    MdbTablePaginationComponent,
    MdbTableDirective
} from 'angular-bootstrap-md';
import { interval, Observable } from 'rxjs';
import { switchMap, takeWhile, takeLast, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    animations: [routerTransition()],
    providers: [OrdersService]
})
export class OrdersComponent implements OnInit, AfterViewInit {
    @ViewChild(MdbTablePaginationComponent, { static: true })
    mdbTablePagination: MdbTablePaginationComponent;
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    previous: any = [];
    orders: Order[] = [];

    constructor(
        private service: OrdersService,
        private cdRef: ChangeDetectorRef
    ) {}

    async ngOnInit() {
        this.orders = await this.service.getOrders();

        this.mdbTable.setDataSource(this.orders);
        this.orders = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
    }

    ngAfterViewInit() {
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
        this.mdbTablePagination.calculateFirstItemIndex();
        this.mdbTablePagination.calculateLastItemIndex();
        this.cdRef.detectChanges();
    }

    async add() {
        const order = await this.service.addDummyOrder();
        this.orders.push(order);

        this.poll(
            this.service.getOrder(order._id),
            response =>
                response.state !== 'delivered' && response.state !== 'cancelled'
        ).subscribe(response => {
            const lastIndex = this.orders.length - 1;
            if (this.orders[lastIndex].state !== response.state) {
                this.orders[lastIndex].state = response.state;
            }
        });

        this.mdbTable.setDataSource(this.orders);
        this.mdbTablePagination.lastPage();
        if (this.mdbTablePagination.lastItemIndex !== this.orders.length) {
            this.mdbTablePagination.nextPage();
        }
    }

    async cancel(id: string | number) {
        await this.service.cancelOrder(id);
        const index = this.orders.findIndex(order => order._id === id);
        if (index >= 0) {
            this.orders[index].state = 'cancelled';
        }
    }

    poll(ob: Observable<any>, isSuccessFn, pollInterval = 5000) {
        return interval(pollInterval).pipe(
            switchMap(() => ob),
            takeWhile(response => isSuccessFn(response), true)
        );
    }
}
