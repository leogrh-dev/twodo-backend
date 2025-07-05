import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileStoragePort, UploadFileInput } from '../../../application/interfaces/file-storage.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class S3StorageService implements FileStoragePort {
    private s3 = new S3Client({
        region: process.env.AWS_REGION!,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });

    async upload(file: UploadFileInput): Promise<string> {
        const fileExtension = file.originalname.split('.').pop();
        const key = `uploads/${randomUUID()}.${fileExtension}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await this.s3.send(command);

        return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
}