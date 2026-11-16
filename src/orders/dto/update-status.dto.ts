

import { IsIn } from 'class-validator';

import type  { orderStatus } from '../order.type.js';

export class UpdateStatusDto {
    // @IsIn(['Pending', 'Preparing', 'Delivered', 'Cancelled', 'Rejected'])
    @IsIn(['Pending', 'Preparing', 'Delivered', 'Cancelled' , 'Rejected'])
    status: orderStatus;
}