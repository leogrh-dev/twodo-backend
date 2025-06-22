import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlInfraModule } from './infrastructure/graphql/graphql.module';
import { DatabaseInfraModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphqlInfraModule,
    DatabaseInfraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
