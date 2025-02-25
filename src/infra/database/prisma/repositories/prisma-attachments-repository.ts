import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  Attachment,
  AttachmentsRepository,
} from '@/domain/repositories/attachments-repository'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    await this.prisma.attachment.create({
      data: {
        id: attachment.id,
        title: attachment.title,
        url: attachment.url,
      },
    })
  }

  async findById(id: string): Promise<Attachment | null> {
    const attachment = await this.prisma.attachment.findUnique({
      where: {
        id,
      },
    })

    if (!attachment) {
      return null
    }

    return attachment
  }

  async findManyByIds(ids: string[]): Promise<Attachment[]> {
    const attachments = await this.prisma.attachment.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    return attachments
  }

  async delete(id: string): Promise<void> {
    await this.prisma.attachment.delete({
      where: {
        id,
      },
    })
  }
} 