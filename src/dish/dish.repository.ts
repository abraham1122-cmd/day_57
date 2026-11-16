
import { Dish } from './dish.types.js';
import { DishRepository } from './dish.repository.interface.js';

export class InMemoryDishRepository implements DishRepository {

  private readonly dishes = new Map<number, Dish>();

  constructor(initialDishes: Dish[]) {
    for (const dish of initialDishes) {
      this.dishes.set(dish.id, dish);
    }
  }

  findAll(): Dish[] {
    return Array.from(this.dishes.values());
  }

  findById(id: number): Dish | undefined {
    return this.dishes.get(id);
  }

  findByRestaurantId(restaurantId: number): Dish[] {
    return this.findAll().filter(
      dish => dish.restaurantId === restaurantId,
    );
  }

  create(dish: Dish): Dish {
    this.dishes.set(dish.id, dish);
    return dish;
  }
}
