CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  position VARCHAR(30) NOT NULL,
  team VARCHAR(120) NOT NULL,
  goals INTEGER NOT NULL DEFAULT 0 CHECK (goals >= 0),
  assists INTEGER NOT NULL DEFAULT 0 CHECK (assists >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO players (name, position, team, goals, assists)
SELECT seed.name, seed.position, seed.team, seed.goals, seed.assists
FROM (VALUES
  ('Lucas Andrade', 'Atacante', 'Horizonte FC', 12, 5),
  ('Matheus Lima', 'Meio-campista', 'Aurora EC', 8, 11),
  ('Rafael Costa', 'Ponta', 'Horizonte FC', 9, 7),
  ('Bruno Alves', 'Zagueiro', 'Minas Athletic', 2, 1)
) AS seed(name, position, team, goals, assists)
WHERE NOT EXISTS (SELECT 1 FROM players);

