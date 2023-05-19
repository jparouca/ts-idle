import { useEffect, useState } from "react";
import ChampionStatsContainer from "./components/ChampionStats";
import RedMinion from "./components/RedMinion";
import { Champion, GameState, Enemy } from "./types";
import ProgressBar from "./components/AttackProgressBar";

interface GameProps {
  gameState?: GameState;
}


const App: React.FC<GameProps> = ({gameState}) => {
  const initialGameState: GameState = {
    champion: {
      id: '1',
      name: 'Takaxo',
      damage: 12,
      health: 100,
      attackSpeed: 0.5,
    },
    currentEnemy: {
      id: '2',
      name: 'Red Minion',
      damage: 8,
      health: 50,
      attackSpeed: 0.4
    },
    inBattle: false,
  };
  const [champion, setChampion] = useState<Champion>(gameState?.champion || initialGameState.champion);
  const [enemy, setEnemy] = useState<Enemy>(gameState?.currentEnemy || initialGameState.currentEnemy);
  const [inBattle, setInBattle] = useState<boolean>(gameState?.inBattle || initialGameState.inBattle);
  const [championAttackProgress, setChampionAttackProgress] = useState<number>(0);
  const [enemyAttackProgress, setEnemyAttackProgress] = useState<number>(0);


  useEffect(() => {
    let championInterval: ReturnType<typeof setInterval>;
    let enemyInterval: ReturnType<typeof setInterval>;

    if (inBattle) {
      setChampionAttackProgress(0);
      setEnemyAttackProgress(0);

      championInterval = setInterval(() => {
        setEnemy(prev => {
          if (prev.health > 0) {
            return {...prev, health: prev.health - champion.damage};
          } else {
            setInBattle(false);
            return prev;
          }
        });

        setChampionAttackProgress(prev => prev + (100 / (1000 / champion.attackSpeed)));
        if (championAttackProgress >= 100) {
          setChampionAttackProgress(0);
        }
      }, 1000 / champion.attackSpeed);

      enemyInterval = setInterval(() => {
        setChampion(prev => {
          if (prev.health > 0) {
            return {...prev, health: prev.health - enemy.damage};
          } else {
            setInBattle(false);
            return prev;
          }
        });
      }, 1000 / enemy.attackSpeed);
    }
    return () => {
      clearInterval(championInterval);
      clearInterval(enemyInterval);
      setChampionAttackProgress(0);
    };
  }, [inBattle, champion.attackSpeed, enemy.attackSpeed]);

  return (
    <>
      {console.log(championAttackProgress)};
      <ChampionStatsContainer champion={champion}/>
      <ProgressBar progress={championAttackProgress} />
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
