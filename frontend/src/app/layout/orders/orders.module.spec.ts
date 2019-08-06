import { OrdersModule } from './orders.module';

describe('TablesModule', () => {
    let tablesModule: OrdersModule;

    beforeEach(() => {
        tablesModule = new OrdersModule();
    });

    it('should create an instance', () => {
        expect(tablesModule).toBeTruthy();
    });
});
