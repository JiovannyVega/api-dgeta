import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import * as dotenv from 'dotenv';

dotenv.config();

export const mikroOrmConfig: MikroOrmModuleSyncOptions = {
    clientUrl: process.env.DATABASE_URL,
    driver: require('@mikro-orm/mysql').MySqlDriver,
    entities: ['./dist/modules/**/*.entity.js'],
    entitiesTs: ['./src/modules/**/*.entity.ts'],
    debug: process.env.NODE_ENV !== 'production',
};
