
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { DishesService } from './dish.service.js';
import { CreateDishDto } from './dto/create-dish.dto.js';

@Controller('dishes')
export class DishController {
  constructor(
    private readonly dishesService: DishesService,
  ) {}

  @Get()
  findAll(
    @Query('restaurantId', new ParseIntPipe({ optional: true }))
    restaurantId?: number,
  ) {
    if (restaurantId !== undefined) {
      return this.dishesService.findByRestaurantId(restaurantId);
    }

    return this.dishesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.dishesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDishDto) {
    return this.dishesService.create(dto);
  }
}
