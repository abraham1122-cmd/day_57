
// import { Module } from '@nestjs/common';

// import { DISH_REPOSITORY } from './dish.repository.token.js';
// import { InMemoryDishRepository } from './dish.repository.js';
// import { DishController } from './dish.controller.js';
// import { DishesService } from './dish.service.js';
// import { RestaurantsModule } from '../restaurants/restaurants.module.js';

// @Module({
//   imports: [RestaurantsModule],

//   controllers: [DishController],

//   providers: [
//     DishesService,
//     {
//       provide: DISH_REPOSITORY,
//       useClass: InMemoryDishRepository,
//     },
//   ],
// })
// export class DishModule {}





import { Module } from '@nestjs/common';

import { DishController } from './dish.controller.js';
import { DishesService } from './dish.service.js';
import { DISH_REPOSITORY } from './dish.repository.token.js';
import { InMemoryDishRepository } from './dish.repository.js';
import { RestaurantsModule } from '../restaurants/restaurants.module.js';
import { Dishes } from './dishes.seed.js';

@Module({
  imports: [RestaurantsModule],

  controllers: [DishController],

  providers: [
    DishesService,
    {
      provide: DISH_REPOSITORY,
      useFactory: () => new InMemoryDishRepository(Dishes),
    },
  ],
})
export class DishModule {}

