import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Payment', () => {
    it('processOrder should return boolean', async () => {
      const result = await appController.processOrder({});
      expect(typeof result).toBe('boolean');
    });

    it('ok should return true', async () => {
      const result = await appController.ok();
      expect(result).toBe(true);
    });
  });
});
