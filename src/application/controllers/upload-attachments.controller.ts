import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UploadAttachmentsUseCase } from '@/domain/use-cases/upload-attachments'

@Controller('/attachments')
@UseGuards(JwtAuthGuard)
export class UploadAttachmentsController {
  constructor(private uploadAttachments: UploadAttachmentsUseCase) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async handle(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const result = await this.uploadAttachments.execute({
      files: files.map((file) => ({
        fileName: file.originalname,
        fileType: file.mimetype,
        body: file.buffer,
      })),
    })

    return result
  }
} 