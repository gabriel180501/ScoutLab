import type { Player } from '../types/player';

export async function getPlayers(): Promise<Player[]> {
  const response = await fetch('/api/players');

  if (!response.ok) {
    throw new Error('Não foi possível carregar os jogadores.');
  }

  return response.json() as Promise<Player[]>;
}

