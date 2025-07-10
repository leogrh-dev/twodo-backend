import { BadRequestException, Body, Controller, Delete, HttpCode } from '@nestjs/common';
import { DeleteFileUseCase } from 'src/core/use-cases/file/delete-file.usecase';

@Controller('delete')
export class DeleteFileController {
  constructor(private readonly deleteFileUseCase: DeleteFileUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Body('url') url: string): Promise<void> {
    if (!url) {
      throw new BadRequestException('A URL do arquivo é obrigatória');
    }

    await this.deleteFileUseCase.execute(url);
  }
}