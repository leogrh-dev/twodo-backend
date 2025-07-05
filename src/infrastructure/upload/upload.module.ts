import { Module } from '@nestjs/common';
import { UploadController } from '../controllers/upload.controller';
import { UploadFileUseCase } from '../../core/use-cases/file/upload-file.usecase';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [UploadController],
  providers: [UploadFileUseCase],
})
export class UploadModule {}