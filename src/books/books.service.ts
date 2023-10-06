import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly BookModel: Model<BookDocument>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const requestObject = {
      bookId: uuid(),
      ...createBookDto,
    };
    return this.BookModel.create(requestObject);
  }

  findAll() {
    return this.BookModel.find();
  }

  async findOne(bookId: string) {
    const book = await this.BookModel.findOne({ bookId });
    if (!book) {
      throw new BadRequestException('book not found');
    }
  }

  async update(updateBookDto: UpdateBookDto) {
    await this.findOne(updateBookDto.bookId);
    return this.BookModel.findOneAndUpdate(
      { bookId: updateBookDto.bookId },
      updateBookDto,
    );
  }

  async remove(bookId: string) {
    await this.findOne(bookId);
    return this.BookModel.findOneAndRemove({ bookId });
  }
}
