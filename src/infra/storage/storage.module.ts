import { Module } from '@nestjs/common'
import { S3Storage } from './s3-storage'

@Module({
  providers: [S3Storage],
  exports: [S3Storage],
})
export class StorageModule {} 