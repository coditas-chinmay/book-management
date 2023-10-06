import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty()
  bookId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}
