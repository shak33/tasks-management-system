import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { appConfig } from './config/app.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigSchema } from './config/config.types';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigService } from './config/typed-config.service';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: TypedConfigService,
      useExisting: ConfigService,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, typeOrmConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    TasksModule,
  ],
})
export class AppModule {}
