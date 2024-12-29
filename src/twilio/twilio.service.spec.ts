import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from './twilio.service';

describe('TwilioService', () => {
  let service: TwilioService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TwilioService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const mockEnv = {
                TWILIO_ACCOUNT_SID: 'AC12345678901234567890123456789012',
                TWILIO_AUTH_TOKEN: 'testAuthToken',
                TWILIO_PHONE_NUMBER: '+1234567890',
              };
              return mockEnv[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TwilioService>(TwilioService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize the Twilio client with correct credentials', () => {
    const client = service.getClient();
    expect(client).toBeDefined();
    expect(configService.get).toHaveBeenCalledWith('TWILIO_ACCOUNT_SID');
    expect(configService.get).toHaveBeenCalledWith('TWILIO_AUTH_TOKEN');
  });

  it('should return the configured Twilio phone number', () => {
    const phoneNumber = service.getTwilioPhoneNumber();
    expect(phoneNumber).toBe('+1234567890');
    expect(configService.get).toHaveBeenCalledWith('TWILIO_PHONE_NUMBER');
  });

  it('should throw an error if any environment variable is missing', () => {
    jest.spyOn(configService, 'get').mockReturnValueOnce(undefined);
    expect(() => new TwilioService(configService)).toThrowError('Twilio configuration is missing!');
  });
});
