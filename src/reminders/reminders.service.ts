import { Injectable, Logger } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { CronJob } from 'cron'
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) { }

  create(createReminderDto: CreateReminderDto) {
    const { phone, message, scheduledTime } = createReminderDto

    // YYYY-MM-DDTHH:mm:ss.sssZ
    const date = new Date(scheduledTime)

    if (date < new Date()) {
      throw new Error('Scheduled time must be in the future.');
    }

    const job = new CronJob(date, () => {
      this.triggerCall(phone, message);
    });

    this.schedulerRegistry.addCronJob(`reminder-${phone}-${date.getTime()}`, job);
    job.start();

    // log reminder creation
    this.logger.log(
      `Reminder created: phone=${phone}, message="${message}", scheduledTime=${scheduledTime}`,
    );

    return { success: true, message: 'Reminder scheduled successfully.' };
  }

  private triggerCall(phone: string, message: string) {
    this.logger.log(`Triggering call: phone=${phone}, message="${message}"`);
  }

  // findAll() {
  //   return `This action returns all reminders`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} reminder`;
  // }

  // update(id: number, updateReminderDto: UpdateReminderDto) {
  //   return `This action updates a #${id} reminder`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} reminder`;
  // }
}
