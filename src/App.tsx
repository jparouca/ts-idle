import {useState, useEffect} from 'react'

type GameState = {
  faction: 'Demacia' | 'Noxus' | 'Piltover' | null;
  damage: number;
  life: number;
  attackSpeed: number;
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectFaction: (faction: 'Demacia' | 'Noxus' | 'Piltover') => void;
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    faction: null,
    damage: 0,
    life: 0,
    attackSpeed: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [gold, setGold] = useState(0);
  const [dagger, setDagger] = useState(false);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    if (gameState.faction !== null) {
      const interval = setInterval(() => {
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
  setIsModalOpen(false);

};

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectFaction={selectFaction}
      />
      <h1>Gold: {gold} </h1>
      <button
        className='p-4'
        onClick={
          () => {farm()}
        }>
        Farm
      </button>
      <h2> Faction:{gameState.faction} </h2>

      <button onClick={() => {buyDagger()}}> buy dagger</button>
    </>
  )
}

export default App


const Modal: React.FC<ModalProps> = ({isOpen, onClose, selectFaction}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl sm:max-w-lg sm:w-full">
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
