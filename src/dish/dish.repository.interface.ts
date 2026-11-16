

import { Dish } from "./dish.types.js";


export interface DishRepository {

    findAll(): Dish[];

    findById(id: number): Dish | undefined;

    findByRestaurantId(restaurantId: number): Dish [] | undefined;

    create(dish: Dish): Dish;
}