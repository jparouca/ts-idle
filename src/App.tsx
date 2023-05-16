import { useEffect, useState } from "react";
import ChampionStatsContainer from "./components/ChampionStats";
import RedMinion from "./components/RedMinion";
import { Champion, GameState, Enemy } from "./types";

interface GameProps {
  gameState?: GameState;
}


const App: React.FC<GameProps> = ({gameState}) => {
  const initialGameState: GameState = {
    champion: {
      id: '1',
      name: 'Takaxo',
      damage: 63,
      attackSpeed: 1,
      health: 550,
    },
    currentEnemy: {
      id: '2',
      name: 'Red Minion',
      damage: 8,
      health: 250,
      attackSpeed: 0.314
    },
    inBattle: false,
  };
  const [champion, setChampion] = useState<Champion>(gameState?.champion || initialGameState.champion);
  const [enemy, setEnemy] = useState<Enemy>(gameState?.currentEnemy || initialGameState.currentEnemy);
  const [inBattle, setInBattle] = useState<boolean>(gameState?.inBattle || initialGameState.inBattle);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (inBattle) {
      interval = setInterval(() => {
        if (enemy.health >= 0 && champion.health > 0) {
          setEnemy(prev => ({...prev, health: prev.health - champion.damage}))
          setChampion(prev => ({...prev, health: prev.health - enemy.damage}))
        } else {
          setInBattle(false);
        }
      }, 1000 / champion.attackSpeed);
    }
    return () => clearInterval(interval);
  }, [inBattle, enemy.health, champion]);

  return (
    <>
      <ChampionStatsContainer champion={champion}/>
      <RedMinion enemy={enemy} />
      <button
        disabled={inBattle}
        onClick={() => setInBattle(true)}>
        {inBattle ? 'Farming...' : 'Farm'}
      </button>

    </>
  )
};


export default App;
