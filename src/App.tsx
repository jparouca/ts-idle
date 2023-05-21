import { useEffect, useState, useRef} from "react";
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
  const championPrevTimestamp = useRef<number>(0);
  const championAttackDuration = 1000 / champion.attackSpeed;
  const enemyPrevTimestamp = useRef<number>(0);
  const enemyAttackDuration = 1000 / enemy.attackSpeed;

  const frame = (timestamp: number) => {
    attack(timestamp);
    requestAnimationFrame(frame);
  }

  useEffect(() => {
    requestAnimationFrame(frame);
    return () => setChampionAttackProgress(0);
  }, [inBattle, champion, enemy]);

  function attack(timestamp: number) {
    if (!inBattle) {
      championPrevTimestamp.current, enemyPrevTimestamp.current = 0;
      setChampionAttackProgress(0);
      setEnemyAttackProgress(0);
      return;
    }

    if (!championPrevTimestamp.current) championPrevTimestamp.current = timestamp;
    if (!enemyPrevTimestamp.current) enemyPrevTimestamp.current = timestamp;

    const championDelta = timestamp - championPrevTimestamp.current;
    const enemyDelta = timestamp - enemyPrevTimestamp.current;

    if (championDelta > championAttackDuration) {
      championPrevTimestamp.current = timestamp;
      setEnemy(prev => {
        if (prev.health > champion.damage) {
          return {...prev, health: prev.health - champion.damage}
        } else {
          setInBattle(false);
          return {...prev, health: 0};
        }
      });
      setChampionAttackProgress(0);
      if (enemy.health - champion.damage <= 0) {
        return;
      }
    } else {
      setChampionAttackProgress((championDelta / championAttackDuration) * 100);
    }

    if (enemyDelta > enemyAttackDuration) {
      enemyPrevTimestamp.current = timestamp;
      setChampion(prev => {
        if (prev.health > enemy.damage) {
          return {...prev, health: prev.health - enemy.damage}
        } else {
          setInBattle(false);
          return {...prev, health: 0};
        }
      });
      setEnemyAttackProgress(0);
      if (champion.health - enemy.damage <= 0) {
        return;
      }
    } else {
      setEnemyAttackProgress((enemyDelta / enemyAttackDuration) * 100);
    }
  }


  return (
    <>
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


