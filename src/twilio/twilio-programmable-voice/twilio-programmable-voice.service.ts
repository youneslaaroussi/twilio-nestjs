import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TwilioService } from '../twilio.service';

@Injectable()
export class TwilioProgrammableVoiceService {
    private readonly logger = new Logger(TwilioProgrammableVoiceService.name);

    constructor(private twilioService: TwilioService) { }

    async makeVoiceCall(to: string, message: string): Promise<void> {
        try {
            const client = this.twilioService.getClient();
            const from = this.twilioService.getTwilioPhoneNumber();

            this.logger.log(`Initiating voice call to ${to} from ${from}`);
            const call = await client.calls.create({
                to,
                from,
                twiml: `<Response><Say>${message}</Say></Response>`,
            });

            this.logger.log(`Voice call initiated successfully. Call SID: ${call.sid}`);
        } catch (error) {
            this.logger.error(`Failed to make voice call to ${to}: ${error.message}`, error.stack);
            throw error;
        }
    }
}
