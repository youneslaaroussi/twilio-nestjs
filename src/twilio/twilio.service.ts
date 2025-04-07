import { Twilio } from 'twilio';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../common/enums/environment.enum';

@Injectable()
export class TwilioService {
    private readonly logger = new Logger(TwilioService.name);
    private readonly twilioClient: Twilio;
    private readonly twilioPhoneNumber: string;

    constructor(private readonly configService: ConfigService) {
        const accountSid = this.getRequiredConfig(Environment.TWILIO_ACCOUNT_SID);
        const authToken = this.getRequiredConfig(Environment.TWILIO_AUTH_TOKEN);
        this.twilioPhoneNumber = this.getRequiredConfig(Environment.TWILIO_PHONE_NUMBER);


        this.twilioClient = new Twilio(accountSid, authToken);
        this.logger.log('Twilio client initialized.');
    }

    private getRequiredConfig(key: Environment): string {
        const val = this.configService.get<string>(key);
        if (!val) throw new Error('Twilio configuration is missing!');
        return val;
   }

    getClient(): Twilio {
        return this.twilioClient;
    }

    getTwilioPhoneNumber(): string {
        return this.twilioPhoneNumber;
    }
}
