import { Inject, Injectable } from '@nestjs/common';
import { FileStoragePort, UploadFileInput } from '../../../application/interfaces/file-storage.interface';
import { FileStoragePortToken } from '../../../application/interfaces/file-storage.token';

@Injectable()
export class UploadFileUseCase {
  constructor(
    @Inject(FileStoragePortToken)
    private readonly storage: FileStoragePort,
  ) { }

  async execute(input: UploadFileInput): Promise<string> {
    return this.storage.upload(input);
  }
}
