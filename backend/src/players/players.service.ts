import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DATABASE_POOL } from '../database/database.module';
import { Player } from './player';

@Injectable()
export class PlayersService {
  constructor(@Inject(DATABASE_POOL) private readonly database: Pool) {}

  async findAll(): Promise<Player[]> {
    const result = await this.database.query<Player>(`
      SELECT id, name, position, team, goals, assists
      FROM players
      ORDER BY goals DESC, assists DESC, name ASC
    `);

    return result.rows;
  }
}

