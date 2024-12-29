import { IsNotEmpty, IsPhoneNumber, IsDateString } from 'class-validator'

export class CreateReminderDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    @IsDateString()
    scheduledTime: string;
}
