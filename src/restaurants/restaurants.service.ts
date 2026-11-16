import { Injectable } from '@nestjs/common';
import { Restaurants } from './restaurants.type.js';

@Injectable()
export class RestaurantsService {
  private readonly restaurants: Restaurants[] = [
    { restaurantId: 1, name: 'Habesha Restaurant' },
    { restaurantId: 2, name: 'Addis Pizza House' },
    { restaurantId: 3, name: 'Burger House' },
    { restaurantId: 4, name: 'Vegetarian Kitchen' },
  ];

  findAll(): Restaurants[] {
    return this.restaurants;
  }

  findOne(id: number): Restaurants | undefined {
    return this.restaurants.find(
      restaurant => restaurant.restaurantId === id,
    );
  }

  exists(id: number): boolean {
    return this.restaurants.some(
      restaurant => restaurant.restaurantId === id,
    );
  }
}