import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../shared';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';

@NgModule({
    declarations: [ServicesComponent],
    imports: [
        CommonModule,
        ServicesRoutingModule,
        PageHeaderModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot()
    ]
})
export class ServicesModule {}
