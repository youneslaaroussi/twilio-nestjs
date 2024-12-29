import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RemindersController } from './reminders/reminders.controller';
import { RemindersService } from './reminders/reminders.service';
import { TwilioService } from './twilio/twilio.service';
import { ConfigModule } from '@nestjs/config';
import { TwilioProgrammableVoiceService } from './twilio/twilio-programmable-voice/twilio-programmable-voice.service';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [RemindersController],
  providers: [RemindersService, TwilioService, TwilioProgrammableVoiceService],
})
export class AppModule { }
