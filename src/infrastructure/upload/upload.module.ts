import { Module } from '@nestjs/common';
import { UploadController } from '../controllers/upload-aws-file.controller';
import { UploadFileUseCase } from '../../core/use-cases/file/upload-file.usecase';
import { ServicesModule } from '../services/services.module';
import { DeleteFileUseCase } from 'src/core/use-cases/file/delete-file.usecase';
import { DeleteFileController } from '../controllers/delete-aws-file.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UploadController, DeleteFileController],
  providers: [UploadFileUseCase, DeleteFileUseCase],
  exports: [DeleteFileUseCase],
})
export class UploadModule {}