import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ServicesComponent } from './services.component';
import { ServicesModule } from './services.module';

describe('TablesComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ServicesModule, RouterTestingModule]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(ServicesComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
