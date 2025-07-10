import {
    BadRequestException,
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
        if (!file) {
            throw new BadRequestException('Nenhum arquivo enviado');
        }

        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            throw new BadRequestException('O arquivo excede o limite de 5MB');
        }

        const { buffer, mimetype, originalname } = file;

        const url = await this.uploadFileUseCase.execute({
            buffer,
            mimetype,
            originalname,
        });

        return { url };
    }
}