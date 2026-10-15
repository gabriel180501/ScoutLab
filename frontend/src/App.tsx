import { useEffect, useState } from 'react';
import { Activity, BarChart3, Search, Shield, Users } from 'lucide-react';
import { getPlayers } from './services/api';
import type { Player } from './types/player';

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPlayers()
      .then(setPlayers)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Erro inesperado.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">S</span><span>ScoutLab</span></div>
        <nav aria-label="Navegação principal">
          <a className="nav-item active" href="#"><BarChart3 size={19} /> Visão geral</a>
          <a className="nav-item" href="#players"><Users size={19} /> Jogadores</a>
          <a className="nav-item" href="#"><Shield size={19} /> Times</a>
          <a className="nav-item" href="#"><Activity size={19} /> Partidas</a>
        </nav>
        <p className="sidebar-note">Temporada 2026</p>
      </aside>

      <main>
        <header className="topbar">
          <div><p className="eyebrow">PAINEL DE ANÁLISE</p><h1>Visão geral</h1></div>
          <button className="profile" type="button" aria-label="Abrir perfil">GO</button>
        </header>

        <section className="summary" aria-label="Resumo">
          <article><span>Jogadores monitorados</span><strong>{loading ? '—' : players.length}</strong><small>Base ativa</small></article>
          <article><span>Gols registrados</span><strong>{loading ? '—' : players.reduce((sum, player) => sum + player.goals, 0)}</strong><small>Temporada atual</small></article>
          <article><span>Assistências</span><strong>{loading ? '—' : players.reduce((sum, player) => sum + player.assists, 0)}</strong><small>Temporada atual</small></article>
        </section>

        <section className="panel" id="players">
          <div className="panel-heading">
            <div><p className="eyebrow">DESEMPENHO</p><h2>Destaques da temporada</h2></div>
            <label className="search"><Search size={17} /><span>Dados vindos da API</span></label>
          </div>

          {loading && <p className="state">Buscando jogadores...</p>}
          {error && <p className="state error">{error} Confira se a API e o PostgreSQL estão em execução.</p>}
          {!loading && !error && (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Jogador</th><th>Time</th><th>Posição</th><th>Gols</th><th>Assist.</th></tr></thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr key={player.id}>
                      <td><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{player.name}</strong></td>
                      <td>{player.team}</td><td><span className="tag">{player.position}</span></td>
                      <td className="metric">{player.goals}</td><td className="metric">{player.assists}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

