import { randomUUID } from 'node:crypto'
import { AttachmentsRepository } from '../repositories/attachments-repository'
import { S3Storage } from '@/infra/storage/s3-storage'

interface UploadAttachmentsUseCaseRequest {
  files: Array<{
    fileName: string
    fileType: string
    body: Buffer
  }>
}

interface UploadAttachmentsUseCaseResponse {
  attachments: Array<{
    id: string
    url: string
  }>
}

export class UploadAttachmentsUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private storage: S3Storage,
  ) {}

  async execute({
    files,
  }: UploadAttachmentsUseCaseRequest): Promise<UploadAttachmentsUseCaseResponse> {
    const attachments = await Promise.all(
      files.map(async (file) => {
        const { key, url } = await this.storage.upload(file.body, file.fileType)

        const attachment = {
          id: randomUUID(),
          title: file.fileName,
          url,
        }

        await this.attachmentsRepository.create(attachment)

        return {
          id: attachment.id,
          url: attachment.url,
        }
      }),
    )

    return {
      attachments,
    }
  }
} 