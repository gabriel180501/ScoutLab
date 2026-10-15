import { Test } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

describe('PlayersController', () => {
  it('returns players supplied by the service', async () => {
    const players = [{ id: 1, name: 'Lucas', position: 'Atacante', team: 'Horizonte FC', goals: 12, assists: 5 }];
    const module = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [{ provide: PlayersService, useValue: { findAll: jest.fn().mockResolvedValue(players) } }],
    }).compile();

    await expect(module.get(PlayersController).findAll()).resolves.toEqual(players);
  });
});

