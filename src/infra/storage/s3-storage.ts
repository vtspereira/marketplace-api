import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomUUID } from 'node:crypto'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { Env } from '@/env'

@Injectable()
export class S3Storage {
  private client: S3Client

  constructor(private config: ConfigService<Env, true>) {
    const accessKeyId = this.config.get('AWS_ACCESS_KEY_ID')
    const secretAccessKey = this.config.get('AWS_SECRET_ACCESS_KEY')
    const region = this.config.get('AWS_REGION')

    this.client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }

  async upload(
    file: Buffer,
    mimeType: string,
  ): Promise<{ key: string; url: string }> {
    const uploadId = randomUUID()
    const uniqueKey = `${uploadId}-${Date.now()}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.config.get('AWS_BUCKET'),
        Key: uniqueKey,
        ContentType: mimeType,
        Body: file,
      }),
    )

    return {
      key: uniqueKey,
      url: `https://${this.config.get('AWS_BUCKET')}.s3.${this.config.get(
        'AWS_REGION',
      )}.amazonaws.com/${uniqueKey}`,
    }
  }

  async delete(key: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.config.get('AWS_BUCKET'),
        Key: key,
      }),
    )
  }
} 