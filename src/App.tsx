import {useState, useEffect} from 'react'

type GameState = {
  faction: 'Demacia' | 'Noxus' | 'Piltover' | null;
  damage: number;
  life: number;
  attackSpeed: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    faction: null,
    damage: 0,
    life: 0,
    attackSpeed: 0,
  });
  const [gold, setGold] = useState(0);
  const [dagger, setDagger] = useState(false);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    if (gameState.faction !== null) {
      const interva = setInterval(() => {
        setGold(gold + 1);
      }, 1000);
    
      return () => clearInterval(interval);
    }
  }, [gameState.faction]);


  function buyDagger() {
    if (gold >= 10 && !dagger) {
      setDagger(true);
      setGold(gold - 10);
      setRate(rate + 1);
    }
  }

  function farm() {
    setGold(gold * rate + 1);
  }

  return (
    <>
      <h1>Gold: {gold} </h1>
      <button
        className='p-4'
        onClick={
          () => {farm()}
          }>
        Farm
      </button>

      <button onClick={() => {buyDagger()}}> buy dagger</button>
    </>
  )
}

export default App


function selectFaction (faction: 'Demacia' | 'Noxus' | 'Piltover') {
  let newState: GameState;

  switch (faction) {
    case 'Demacia':
      newState = {
        faction: 'Demacia',
        damage: 14,
        life: 140,
        attackSpeed: 1.2,
      };
      break;
    case 'Noxus':
      newState = {
        faction: 'Noxus',
        damage: 18,
        life: 120,
        attackSpeed: 1.2,
      };
      break;
    case 'Piltover':
      newState = {
        faction: 'Piltover',
        damage: 12,
        life: 160,
        attackSpeed: 1.2,
      };
      break;
    default:
      return;
  }

  setGameState(newState);
}
