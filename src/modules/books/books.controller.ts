import path from 'path';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { errorHandlerApi } from '../../utils';
import { APP_ROOT_PATH } from '../../constants';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private service: BooksService) {}

  @Get()
  public async getAllBooks(_: Request, res: Response) {
    try {
      const books = await this.service.getAll();
      return res.status(200).json(books);
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }

  @Get(':id')
  public async getBookById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await this.service.getOne(id);
      return res.status(200).json(book);
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async addBook(req: Request, res: Response) {
    try {
      const { body, file } = req;
      if (body) {
        if (file) {
          const bookParams = { ...body, fileBook: file.path };
          const { book } = await this.service.create(bookParams);
          return res.status(201).json(book);
        }
        return res.status(400).json('Where is book file, Bukovski?');
      }
      return res.status(400).json('Where is request body, Lebovski?');
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  public async modifyBookById(req: Request, res: Response) {
    const { body, params, file } = req;
    const { id } = params;
    if (file) body.fileBook = file.path;

    try {
      const updatedBook = await this.service.updateOne(id, body, {
        new: true,
      });
      return res.status(200).json(updatedBook);
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }

  @Delete(':id')
  public deleteBookById(req: Request, res: Response) {
    const { id } = req.params;
    return this.service
      .deleteOne(id)
      .then(() => res.status(200).json('ok'))
      .catch(errorHandlerApi(res));
  }

  @Get()
  public async downloadBook(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const book = await this.service.getOne(id);
      const filePath = path.join(APP_ROOT_PATH, book.fileBook);
      return res.download(filePath, 'book.pdf', (err: any) => {
        if (err) {
          res.status(404).json(err);
        }
      });
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }
}
