export interface UploadFileInput {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
}

export interface FileStoragePort {
    upload(file: UploadFileInput): Promise<string>;
}
