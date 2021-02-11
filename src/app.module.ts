import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { EventModule } from './Event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './User/user.entity';
import { EventEntity } from "./Event/event.entity";

@Module({
  imports: [
    UserModule,
    EventModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, EventEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
