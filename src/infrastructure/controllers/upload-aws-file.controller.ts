import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from '../../core/use-cases/file/upload-file.usecase';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadFileUseCase: UploadFileUseCase) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        const { buffer, mimetype, originalname } = file;

        const url = await this.uploadFileUseCase.execute({
            buffer,
            mimetype,
            originalname,
        });

        return { url };
    }
}