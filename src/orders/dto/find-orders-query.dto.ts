

import { Type } from 'class-transformer';
import {
    IsIn,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class FindOrdersQuery {
    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    area?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 20;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset: number = 0;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sort: 'asc' | 'desc' = 'desc';
}