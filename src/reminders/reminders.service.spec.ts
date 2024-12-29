import { Test, TestingModule } from '@nestjs/testing';
import { RemindersService } from './reminders.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TwilioProgrammableVoiceService } from 'src/twilio/twilio-programmable-voice/twilio-programmable-voice.service';

describe('RemindersService', () => {
  let service: RemindersService;
  let schedulerRegistry: SchedulerRegistry;
  let twilioService: TwilioProgrammableVoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemindersService,
        {
          provide: SchedulerRegistry,
          useValue: {
            addCronJob: jest.fn(),
          },
        },
        {
          provide: TwilioProgrammableVoiceService,
          useValue: {
            makeVoiceCall: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RemindersService>(RemindersService);
    schedulerRegistry = module.get<SchedulerRegistry>(SchedulerRegistry);
    twilioService = module.get<TwilioProgrammableVoiceService>(TwilioProgrammableVoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('triggerCall', () => {
    it('should call TwilioProgrammableVoiceService.makeVoiceCall', async () => {
      const phone = '+1234567890';
      const message = 'Test message';

      jest.spyOn(twilioService, 'makeVoiceCall').mockResolvedValue();

      await (service as any).triggerCall(phone, message);

      expect(twilioService.makeVoiceCall).toHaveBeenCalledWith(phone, message);
    });
  });
});
