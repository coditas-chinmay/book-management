import mongoose from 'mongoose';
import { AppService } from './app.service';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

const logger = new Logger();

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        try {
          const uri = 'mongodb://127.0.0.1:27017/book';
          await mongoose.connect(uri);
          logger.log('Database connection successfull');
          return { uri };
        } catch (error) {
          console.log('Database connection failed');
          throw error;
        }
      },
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
