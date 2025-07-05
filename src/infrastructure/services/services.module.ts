import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email/send-email.service';
import { RedisService } from './redis/redis.service';
import { S3StorageService } from './aws/s3-storage.service';
import { FileStoragePortToken } from 'src/application/interfaces/file-storage.token';


@Module({
  providers: [
    SendEmailService,
    RedisService,
    {
      provide: FileStoragePortToken,
      useClass: S3StorageService,
    },
  ],
  exports: [
    SendEmailService,
    RedisService,
    FileStoragePortToken,
  ],
})
export class ServicesModule { }
