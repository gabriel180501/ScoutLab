import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export const DATABASE_POOL = Symbol('DATABASE_POOL');

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new Pool({
          connectionString: config.get(
            'DATABASE_URL',
            'postgresql://scoutlab:scoutlab_dev@localhost:5432/scoutlab',
          ),
        }),
    },
  ],
  exports: [DATABASE_POOL],
})
export class DatabaseModule {}

