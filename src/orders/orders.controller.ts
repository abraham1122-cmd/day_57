
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Query
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './order.service.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';
import type { Response } from 'express';

@Controller({
  path: 'restaurants/:restaurantId/orders',
  version: '1',
})
export class OrdersController {
  constructor(
    private readonly orderService: OrdersService,
  ) {}

  // GET /api/v1/restaurants/:restaurantId/orders/pending
  @Get('pending')
  findPending() {
    return this.orderService.findPending();
  }

  // GET /api/v1/restaurants/:restaurantId/orders
  @Get()
  findByRestaurant(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Query() query: Record<string, string>
  ) {
    return this.orderService.findByRestaurant(restaurantId, query);
  }

  // GET /api/v1/restaurants/:restaurantId/orders/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  // PATCH /api/v1/restaurants/:restaurantId/orders/:id/status
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.orderService.updateStatus(id, dto.status);
  }

  // DELETE /api/v1/restaurants/:restaurantId/orders/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }

  // POST /api/v1/restaurants/:restaurantId/orders
  // @Post()
  // create(@Body() dto: CreateOrderDto) {
  //   return this.orderService.create(dto);
  // }

  @Post()
create(
  @Param('restaurantId', ParseIntPipe) restaurantId: number,
  @Body() dto: CreateOrderDto,
  @Res({ passthrough: true }) response: Response,
) {
  const order = this.orderService.create(dto);

  response.setHeader(
    'Location',
    `/api/v1/restaurants/${restaurantId}/orders/${order.id}`,
  );

  return order;
}
}
