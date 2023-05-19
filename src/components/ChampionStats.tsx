import {Champion} from '../types';
import ProgressBar from './AttackProgressBar';
import HealthBar from './HealthBar';

interface ChampionStatsProps {
  champion: Champion;
};

const ChampionStatsContainer: React.FC<ChampionStatsProps> = ({ champion }) => {
  return (
    <div className='max-w-max rounded justify-center items-center border border-solid p-2'>
      <header className='flex items-center flex-row'>
        <h1 className='text-2xl text-gray-900 mr-2'>Takaxo</h1>
      </header>
      <HealthBar 
        current={champion.health}  
        max={100}
      />
      <div className='pt-2 px-4'>
        <ul className='text-sm'>
          <li>Damage: {champion.damage}</li>
          <li>Life: {champion.health}</li>
          <li>Attack Speed: {champion.attackSpeed}</li>
        </ul>
      </div>
    </div>
  );
};

export default ChampionStatsContainer;
