import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { mikroOrmConfig } from './config/database.config';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { PersonalInformationModule } from './modules/personal-information/personal-information.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UserModule,
    RoleModule,
    AuthModule,
    PersonalInformationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
