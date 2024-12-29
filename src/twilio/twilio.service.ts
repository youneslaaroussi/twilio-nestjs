import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { Environment } from '../common/enums/environment.enum';

@Injectable()
export class TwilioService {
    private readonly logger = new Logger(TwilioService.name);
    private twilioClient: Twilio;
    private twilioPhoneNumber: string;

    constructor(private configService: ConfigService) {
        const accountSid = this.configService.get<string>(Environment.TWILIO_ACCOUNT_SID);
        const authToken = this.configService.get<string>(Environment.TWILIO_AUTH_TOKEN);
        this.twilioPhoneNumber = this.configService.get<string>(Environment.TWILIO_PHONE_NUMBER);

        if (!accountSid || !authToken || !this.twilioPhoneNumber) {
            throw new Error('Twilio configuration is missing!');
        }

        this.twilioClient = new Twilio(accountSid, authToken);
        this.logger.log('Twilio client initialized.');
    }

    getClient(): Twilio {
        return this.twilioClient;
    }

    getTwilioPhoneNumber(): string {
        return this.twilioPhoneNumber;
    }
}
