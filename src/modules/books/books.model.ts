import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { BOOKS_FILE_PATH } from '../../constants';

type BookDocument = Book & Document;

@Schema()
class Book {
  @Prop({ required: true })
  public title: string;

  @Prop({ default: '' })
  public description: string;

  @Prop({ default: '' })
  public authors: string;

  @Prop({ default: '' })
  public favourite: string;

  @Prop({ default: '' })
  public fileCover: string;

  @Prop({ default: '' })
  public fileName: string;

  @Prop({ default: `${BOOKS_FILE_PATH}/book.pdf` })
  public fileBook: string;
}

const BookSchema = SchemaFactory.createForClass(Book);

export { BookDocument, Book, BookSchema };
