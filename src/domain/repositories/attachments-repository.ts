export interface Attachment {
  id: string
  title: string
  url: string
}

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
  abstract findById(id: string): Promise<Attachment | null>
  abstract findManyByIds(ids: string[]): Promise<Attachment[]>
  abstract delete(id: string): Promise<void>
} 