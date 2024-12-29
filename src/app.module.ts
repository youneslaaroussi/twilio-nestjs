import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RemindersController } from './reminders/reminders.controller';
import { RemindersService } from './reminders/reminders.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class AppModule { }
