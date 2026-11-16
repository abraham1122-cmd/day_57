
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import type { OrderRepository } from './order.repository.js';
import type { CreateOrderDto } from './dto/create-order.dto.js';
import { RestaurantsService } from '../restaurants/restaurants.service.js';
import { RESERVED_QUERY_NAMES } from '../common/reserved-query-names.js';
import { orderStatus } from './order.type.js';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,

    private readonly restaurantsService: RestaurantsService,
  ) {}

  // Get pending orders
  findPending() {
    const orders = this.orderRepository.findAll();

    console.log('All orders', orders);

    return orders.filter(order => order.status === 'Pending');
  }

  // Get orders by restaurant with filtering and sorting
  findByRestaurant(
    restaurantId: number,
    query: Record<string, string>,
  ) {
    const restaurant = this.restaurantsService.findOne(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurants not found');
    }

    let orders = this.orderRepository
      .findAll()
      .filter(order => order.restaurantId === restaurantId);

    // Apply filters
    const filters = Object.entries(query).filter(
      ([key]) =>
        !RESERVED_QUERY_NAMES.includes(
          key as typeof RESERVED_QUERY_NAMES[number],
        ),
    );

    for (const [key, value] of filters) {
      const allowedValues = value.split(',').map(item => item.trim());

      orders = orders.filter(order => {
        const orderValue = (
          order as unknown as Record<string, unknown>
        )[key];

        return allowedValues.includes(String(orderValue));
      });
    }

    // Apply sorting
    if (query.sort) {
      const descending = query.sort.startsWith('-');

      const sortField = descending
        ? query.sort.slice(1)
        : query.sort;

      const allowedSortFields = ['id', 'restaurantId', 'status'];

      if (!allowedSortFields.includes(sortField)) {
        throw new BadRequestException('Invalid sort field');
      }

      orders.sort((a, b) => {
        const first = String(
          (a as unknown as Record<string, unknown>)[sortField],
        );

        const second = String(
          (b as unknown as Record<string, unknown>)[sortField],
        );

        const result = first.localeCompare(second, undefined, {
          numeric: true,
        });

        return descending ? -result : result;
      });
    }


       // Apply field selection
if (query.fields) {
  const selectedFields = query.fields
    .split(',')
    .map(field => field.trim())
    .filter(Boolean);

  return orders.map(order =>
    Object.fromEntries(
      Object.entries(order).filter(([key]) =>
        selectedFields.includes(key),
      ),
    ),
  );
}

    return orders;
  }

  updateStatus(id: number, status: orderStatus) {
    const order = this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException('order not found');
    }

    order.status = status;

    return order;
  }

  // Idempotent delete
  remove(id: number) {
    this.orderRepository.delete(id);
  }

  // Get one order by ID
  findOne(id: number) {
    const order = this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }


    return order;
  }

  // Create a new order
  create(dto: CreateOrderDto) {
    return this.orderRepository.create(dto);
  }
}
