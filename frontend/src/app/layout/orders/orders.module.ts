import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { PageHeaderModule } from '../../shared';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
    imports: [
        CommonModule,
        OrdersRoutingModule,
        PageHeaderModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot()
    ],
    declarations: [OrdersComponent]
})
export class OrdersModule {}
