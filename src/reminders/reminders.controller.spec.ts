import { Test, TestingModule } from '@nestjs/testing';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

describe('RemindersController', () => {
  let controller: RemindersController;
  let service: RemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemindersController],
      providers: [
        {
          provide: RemindersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RemindersController>(RemindersController);
    service = module.get<RemindersService>(RemindersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createReminder', () => {
    it('should call RemindersService.create with correct parameters', async () => {
      const createReminderDto = {
        phone: '+1234567890',
        message: 'Test message',
        scheduledTime: '2024-12-30T15:00:00Z',
      };

      jest.spyOn(service, 'create').mockResolvedValue({
        success: true,
        message: 'Reminder scheduled successfully.',
      });

      const result = await controller.create(createReminderDto);

      expect(service.create).toHaveBeenCalledWith(createReminderDto);
      expect(result).toEqual({
        success: true,
        message: 'Reminder scheduled successfully.',
      });
    });
  });
});
