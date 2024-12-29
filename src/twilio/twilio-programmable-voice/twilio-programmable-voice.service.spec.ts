import { Test, TestingModule } from '@nestjs/testing';
import { TwilioProgrammableVoiceService } from './twilio-programmable-voice.service';

describe('TwilioProgrammableVoiceService', () => {
  let service: TwilioProgrammableVoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwilioProgrammableVoiceService],
    }).compile();

    service = module.get<TwilioProgrammableVoiceService>(TwilioProgrammableVoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
