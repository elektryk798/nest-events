import {
    Controller,
    Get,
    Put,
    Post,
    Delete,
    Request,
    Query,
    Param,
    ParseUUIDPipe,
    UseGuards,
    BadRequestException
} from '@nestjs/common';
import { EventService } from '../Services/event.service';
import { JwtAuthGuard } from '../../User/Passport/Guards/jwt-auth.guard';

@Controller('api/events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req) {
        if (req.body.start > req.body.end) {
            throw new BadRequestException();
        }

        return this.eventService.create(req.body, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Request() req) {
        return this.eventService.getAll(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/list')
    async paginatedList(@Request() req, @Query() query) {
        return this.eventService.getAllPaginated({page: query.page ?? 1, limit: query.limit ?? 10}, req.user.id, query.filter);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
        const event = await this.eventService.getOneById(id);

        const eventValidUser = event.user.id === req.user.id;

        const eventValidDates = req.body.start < req.body.end;

        if (!event || !eventValidUser || !eventValidDates) {
            throw new BadRequestException();
        }

        return await this.eventService.update(req.body, event);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getOne(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
        const event = await this.eventService.getOneById(id);

        const eventValidUser = event.user.id === req.user.id;

        if (!event || !eventValidUser) {
            throw new BadRequestException();
        }

        return event;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        const event = await this.eventService.getOneById(id);

        if (!event) {
            throw new BadRequestException();
        }

        return await this.eventService.delete(event);
    }
}
