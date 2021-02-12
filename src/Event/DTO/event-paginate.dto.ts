import {IsIn, IsOptional, IsPositive, IsString} from 'class-validator';
import { Type } from "class-transformer";

export class EventPaginateDTO {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit: number;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page: number;

    @IsOptional()
    @IsString()
    @IsIn(['day', 'week', 'month'])
    filter: string;
}