
import type { Order } from './order.type.ts';

export interface OrderRepository {


  findById(id: number): Order | undefined;
  findAll(): Order[];
  
  
  create(order: Omit<Order, 'id'>): Order;
  delete(id: number): void;
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Map<number, Order>;
  private nextId: number;

  constructor(initialOrders: Order[] = [

     {
      id: 1,
      restaurantId: 1,
      customerName: "becky",
      area: "Bole",
      total: 4000,
      dishes: [{
        name: "tibs",
        price: 4000
      }
       
    ],
    status: "Pending"

     },


      {
      id: 2,
      restaurantId: 2,
      customerName: "secy",
      area: "Gerji",
      total: 5000,
      dishes: [{
        name: "KITFO",
        price: 5000
      }
       
    ],
    status: 'Delivered'

     }



  ]) {
    this.orders = new Map(
      initialOrders.map((order) => [order.id, order])
    );

    this.nextId = Math.max(0, ...initialOrders.map(order => order.id)) + 1;
  }

  findById(id: number): Order | undefined {
    return this.orders.get(id);
  }

  delete(id: number): void{

    this.orders.delete(id);

  }


  findAll(): Order[] {
    return Array.from(this.orders.values());
  }

  create(order: Omit<Order, 'id'>): Order {
    const newOrder: Order = {
      id: this.nextId++,
      ...order,
    };

    this.orders.set(newOrder.id, newOrder);

    return newOrder;
  }
}
