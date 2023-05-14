import {useState, useEffect} from 'react'
import './types'

function App() {
  const [gameState, setGameState] = useState<GameState>({
    faction: null,
    damage: 0,
    life: 0,
    attackSpeed: 0,
    enemy: null,
  });

  function generateEnemy() {
    return {
    name: 'Red Minion',
    damage: 5,
    life: 50,
    attackSpeed: 0.7,
    };
  };
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (gameState.faction !== null) {
      const interval = setInterval(() => {
        combat();
      }, 1000 / gameState.attackSpeed);
    
      return () => clearInterval(interval);
    }
  }, [gameState.faction, gameState.attackSpeed]);


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
    setGameState({...newState, enemy: generateEnemy()});
    setIsModalOpen(false);

  };

  const PlayerStatsContainer: React.FC = () => {
    return (
      <div className='max-w-max rounded justify-center items-center border border-solid p-2'>
        <header className='flex items-center flex-row'>
          <h1 className='text-2xl text-gray-900 mr-2'>Takaxo</h1>
          <h2 className='text-sm text-gray-900'>{gameState.faction}</h2>
        </header>
        <div className='pt-2 px-4'>
          <ul className='text-sm'>
            <li>Damage: {gameState.damage}</li>
            <li>Life: {gameState.life}</li>
            <li>Attack Speed: {gameState.attackSpeed}</li>
          </ul>
        </div>
      </div>
    )
  }

  function combat() {
    if (gameState.enemy) {
      const newEnemyLife = gameState.enemy.life - gameState.damage;

    if (newEnemyLife <= 0) {
      setGameState({
        ...gameState,
        enemy: null,
      });
    } else {
      setGameState({
        ...gameState,
        enemy: {
          ...gameState.enemy,
          life: newEnemyLife,
        },
      });
    }
  }
}

  const MinionStatsContainer: React.FC = () => {
    if (!gameState.enemy) {
      return <h1 className='text-2xl text-green-600'>last hit</h1>;
    }

    return (
      <div className='max-w-max rounded justify-center items-center border border-solid p-2'>
        <header className='flex items-center flex-row'>
          <h1 className='text-2xl text-gray-900 mr-2'>{gameState.enemy.name}</h1>
        </header>
        <div className='pt-2 px-4'>
          <ul className='text-sm'>
            <li>Damage: {gameState.enemy.damage}</li>
            <li>Life: {gameState.enemy.life}</li>
            <li>Attack Speed: {gameState.enemy.attackSpeed}</li>
          </ul>
        </div>
        <button className='rounded px-2 py-1'> attack </button>
      </div>
    )
  }




  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectFaction={selectFaction}
      />
      <PlayerStatsContainer />
      <MinionStatsContainer />
    </>
  )
}

export default App


const Modal: React.FC<ModalProps> = ({isOpen, onClose, selectFaction}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center">
      <div className="bg-white rounded text-center overflow-hidden shadow-xl sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Choose your faction</h3>
          <div className="mt-2">
            <button onClick={() => selectFaction('Demacia')} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Demacia
            </button>
            <button onClick={() => selectFaction('Noxus')} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Noxus
            </button>
            <button onClick={() => selectFaction('Piltover')} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Piltover
            </button>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}


