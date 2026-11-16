


import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  price: number;

  @IsInt()
  @Min(1)
  restaurantId: number;
}
