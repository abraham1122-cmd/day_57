
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Version,
} from '@nestjs/common';

import { RestaurantsService } from './restaurants.service.js';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
  ) {}

  @Version('1')
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Version('1')
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.restaurantsService.findOne(id);
  }
}
