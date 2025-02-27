import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserSubscriber } from 'src/modules/user/subscribers/user.subscriber';

export const typeormConfig = registerAs(
  'TYPEORM_MODULE_CONFIG',
  (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL
        ? process.env.DATABASE_URL
        : 'postgresql://savannah_user:savannah_password@localhost:5432/savannah_database',
      migrationsRun:
        'string' === typeof process.env.DATABASE_MIGRATIONS_RUN
          ? process.env.DATABASE_MIGRATIONS_RUN === 'true'
          : false,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      subscribers: [UserSubscriber],
      synchronize:
        'string' === typeof process.env.DATABASE_SYNCHRONIZE
          ? process.env.DATABASE_SYNCHRONIZE === 'true'
          : true,
      migrations: [__dirname + '/../migrations/*.{js,ts}'],
      autoLoadEntities: true,
      logging: true,
      logger: 'file',
    };
  },
);
