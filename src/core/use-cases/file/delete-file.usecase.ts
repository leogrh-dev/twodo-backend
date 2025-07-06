import { Inject, Injectable } from '@nestjs/common';
import { FileStoragePort } from '../../../application/interfaces/file-storage.interface';
import { FileStoragePortToken } from '../../../application/interfaces/file-storage.token';

@Injectable()
export class DeleteFileUseCase {
  constructor(
    @Inject(FileStoragePortToken)
    private readonly fileStorage: FileStoragePort,
  ) {}

  async execute(url: string): Promise<void> {
    const key = this.extractKeyFromUrl(url);
    await this.fileStorage.delete(key);
  }

  private extractKeyFromUrl(url: string): string {
    const match = url.match(/twodo-archives-bucket\.s3\.[^/]+\.amazonaws\.com\/(.+)/);
    if (!match || !match[1]) {
      throw new Error('URL inválida para deleção');
    }
    return match[1];
  }
}