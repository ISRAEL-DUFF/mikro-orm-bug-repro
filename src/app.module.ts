import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroormOptions from "./mikro-orm.config";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...mikroormOptions
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
