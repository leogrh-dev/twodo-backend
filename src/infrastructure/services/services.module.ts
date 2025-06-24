import { Module } from '@nestjs/common';
import { ConfirmEmailService } from './confirm-email/confirm-email.service';

@Module({
  providers: [ConfirmEmailService],
  exports: [ConfirmEmailService],
})
export class ServicesModule {}
