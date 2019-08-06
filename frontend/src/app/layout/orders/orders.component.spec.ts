import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrdersComponent } from './orders.component';
import { OrdersModule } from './orders.module';

describe('TablesComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [OrdersModule, RouterTestingModule]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(OrdersComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
