import { ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto, CreateBookSchema } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ValidatorPipe } from 'src/util/pipeline/validation.pipe';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(
    @Body(new ValidatorPipe(CreateBookSchema)) createBookDto: CreateBookDto,
  ) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':bookId')
  findOne(@Param('bookId') bookId: string) {
    return this.booksService.findOne(bookId);
  }

  @Patch(':bookId')
  update(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update({ ...updateBookDto, bookId });
  }

  @Delete(':bookId')
  delete(@Param('bookId') bookId: string) {
    return this.booksService.remove(bookId);
  }
}
