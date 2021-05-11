import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from './books.model';

interface CreateBookDto {
  title: BookDocument['title'];
  description: BookDocument['description'];
  authors: BookDocument['authors'];
  favourite: BookDocument['favourite'];
  fileCover: BookDocument['fileCover'];
  fileName: BookDocument['fileName'];
  fileBook: BookDocument['fileBook'];
}

interface UpdateBookDto {
  title?: BookDocument['title'];
  description?: BookDocument['description'];
  authors?: BookDocument['authors'];
  favourite?: BookDocument['favourite'];
  fileCover?: BookDocument['fileCover'];
  fileName?: BookDocument['fileName'];
  fileBook?: BookDocument['fileBook'];
}

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {
    this.initializeDB()
  }

  public async initializeDB() {
    const booksInitCount = [1, 2, 3];
    for await (const el of booksInitCount) {
      try {
        const filter = { title: `Title ${el}` };
        const book = await this.BookModel.findOne(filter);
        if (!book) {
          const newBook = new this.BookModel(filter);
          await newBook.save();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  public async create(
    data: CreateBookDto,
  ): Promise<{ book: BookDocument; _id: string }> {
    const book = new this.BookModel(data);
    await book.save();
    const { _id } = book;
    return { book, _id };
  }

  public getAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public getOne(id: string): Promise<BookDocument> {
    return this.BookModel.findById(id).exec();
  }

  public updateOne(
    id: string,
    newData: UpdateBookDto,
    options: { new: boolean },
  ): Promise<BookDocument> {
    return this.BookModel.findByIdAndUpdate(id, newData, options).exec();
  }

  public deleteOne(id: string): Promise<{ ok?: number }> {
    return this.BookModel.deleteOne({ _id: id }).exec();
  }
}
