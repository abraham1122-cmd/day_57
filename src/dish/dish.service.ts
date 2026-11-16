// import {
//   Inject,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';

// import type { DishRepository } from './dish.repository.interface.js';
// import { DISH_REPOSITORY } from './dish.repository.token.js';
// import { RestaurantsService } from '../restaurants/restaurants.service.js';
// ;

// import { Dish } from './dish.types.js';

// @Injectable()
// export class DishesService {
//   constructor(
//     @Inject(DISH_REPOSITORY)
//     private readonly dishRepository: DishRepository,

//     private readonly restaurantsService: RestaurantsService,
//   ) {}

//   findAll(): Dish[] {
//     return this.dishRepository.findAll();
//   }

//   findOne(id: number): Dish {
//     const dish = this.dishRepository.findById(id);

//     if (!dish) {
//       throw new NotFoundException('Dish not found');
//     }

//     return dish;
//   }

//   findByRestaurantId(restaurantId: number): Dish[] | undefined {
//     return this.dishRepository.findByRestaurantId(restaurantId); 
//   }

//   create(dish: Dish): Dish {
//     const restaurantExists = this.restaurantsService.exists(
//       dish.restaurantId,
//     );

//     if (!restaurantExists) {
//       throw new NotFoundException('Restaurant not found');
//     }

//     return this.dishRepository.create(dish);
//   }
// }




import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Dish } from './dish.types.js';
import type { DishRepository } from './dish.repository.interface.js';
import { DISH_REPOSITORY } from './dish.repository.token.js';
import { RestaurantsService } from '../restaurants/restaurants.service.js';
import { CreateDishDto } from './dto/create-dish.dto.js';

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly dishRepository: DishRepository,

    private readonly restaurantsService: RestaurantsService,
  ) {}

  findAll(): Dish[] {
    return this.dishRepository.findAll();
  }

  findOne(id: number): Dish {
    const dish = this.dishRepository.findById(id);

    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    return dish;
  }

  findByRestaurantId(restaurantId: number): Dish[] | undefined{
    return this.dishRepository.findByRestaurantId(restaurantId);
  }

  create(dto: CreateDishDto): Dish {
    const restaurantExists = this.restaurantsService.exists(
      dto.restaurantId,
    );

    if (!restaurantExists) {
      throw new NotFoundException('Restaurant not found');
    }

    const newDish: Dish = {
      id: Math.max(
        0,
        ...this.dishRepository.findAll().map(dish => dish.id),
      ) + 1,
      name: dto.name,
      price: dto.price,
      restaurantId: dto.restaurantId,
    };

    return this.dishRepository.create(newDish);
  }
}
