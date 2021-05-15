import path from 'path';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseInterceptors,
  Param,
  Req,
  Res,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { errorHandlerApi } from '../../utils';
import { APP_ROOT_PATH } from '../../constants';
import { BooksService } from './books.service';
import { ValidationPipe, bookCreateSchema } from './books.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private service: BooksService) {}

  @Get()
  public async getAllBooks() {
    try {
      const books = await this.service.getAll();
      return books;
    } catch (e) {
      errorHandlerApi(e);
    }
  }

  @Get(':id')
  public async getBookById(@Param('id') id: string) {
    try {
      const book = await this.service.getOne(id);
      return book;
    } catch (e) {
      errorHandlerApi(e);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe(bookCreateSchema))
  public async addBook(@Req() req) {
    try {
      const { body, file } = req;
      if (body) {
        // if (file) {
        const bookParams = { ...body, fileBook: file?.path || '' };
        const { book } = await this.service.create(bookParams);
        return book;
        // }
        // return 'Where is book file, Bukovski?';
      }
      return 'Where is request body, Lebovski?';
    } catch (e) {
      errorHandlerApi(e);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  public async modifyBookById(@Req() req, res: Response) {
    const { body, params, file } = req;
    const { id } = params;
    if (file) body.fileBook = file.path;

    try {
      const updatedBook = await this.service.updateOne(id, body, {
        new: true,
      });
      return updatedBook;
    } catch (e) {
      errorHandlerApi(e);
    }
  }

  @Delete(':id')
  public deleteBookById(@Req() req) {
    const { id } = req.params;
    return this.service
      .deleteOne(id)
      .then(() => 'ok')
      .catch(errorHandlerApi);
  }

  @Get()
  public async downloadBook(@Req() req, @Res() res) {
    const { id } = req.params;
    try {
      const book = await this.service.getOne(id);
      const filePath = path.join(APP_ROOT_PATH, book.fileBook);
      return res.download(filePath, 'book.pdf', (err: any) => {
        if (err) {
          return err;
        }
      });
    } catch (e) {
      errorHandlerApi(e);
    }
  }
}
