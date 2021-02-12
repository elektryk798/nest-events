import {IsDateString, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class EventDTO {
    @IsNotEmpty()
    @IsDateString()
    start: string;

    @IsNotEmpty()
    @IsDateString()
    end: string;

    @IsString()
    @MinLength(3)
    description: string;
}