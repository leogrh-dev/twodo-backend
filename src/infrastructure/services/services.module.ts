import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email/send-email.service';
import { RedisService } from './redis/redis.service';

@Module({
  providers: [SendEmailService, RedisService],
  exports: [SendEmailService, RedisService],
})
export class ServicesModule {}
