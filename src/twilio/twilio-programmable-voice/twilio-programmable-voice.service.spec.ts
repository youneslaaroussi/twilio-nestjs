import { Test, TestingModule } from '@nestjs/testing';
import { TwilioProgrammableVoiceService } from './twilio-programmable-voice.service';
import { TwilioService } from '../twilio.service';

describe('TwilioProgrammableVoiceService', () => {
  let service: TwilioProgrammableVoiceService;
  let twilioService: TwilioService;

  beforeEach(async () => {
    const mockTwilioClient = {
      calls: {
        create: jest.fn().mockResolvedValue({ sid: 'testCallSid' }), // mock sid
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TwilioProgrammableVoiceService,
        {
          provide: TwilioService,
          useValue: {
            getClient: jest.fn(() => mockTwilioClient),
            getTwilioPhoneNumber: jest.fn(() => '+1234567890'),
          },
        },
      ],
    }).compile();

    service = module.get<TwilioProgrammableVoiceService>(TwilioProgrammableVoiceService);
    twilioService = module.get<TwilioService>(TwilioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call Twilio API with correct parameters', async () => {
    const mockTwilioClient = twilioService.getClient();
    const to = '+1987654321';
    const message = 'Hello, this is a test call!';
    const from = twilioService.getTwilioPhoneNumber();

    await service.makeVoiceCall(to, message);

    expect(mockTwilioClient.calls.create).toHaveBeenCalledWith({
      to,
      from,
      twiml: `<Response><Say>${message}</Say></Response>`,
    });
  });
});
