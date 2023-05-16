type Champion = {
  id: string;
  name: string;
  health: number;
  damage: number;
  attackSpeed: number;
};

type Enemy = {
  id: string;
  name: string;
  health: number;
  damage: number;
  attackSpeed: number;
};

type GameState = {
  champion: Champion;
  currentEnemy: Enemy;
  inBattle: boolean;
};

export type { Champion, Enemy, GameState }
