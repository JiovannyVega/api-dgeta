import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [UserModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
