import React from 'react';
import {Enemy} from '../types';
import HealthBar from './HealthBar';


interface RedMinionProps {
  enemy: Enemy;
}


const RedMinion: React.FC<RedMinionProps> = ({enemy}) => {
  return (
  <div>
      <h2> Red Minion </h2>
      <HealthBar
        current={enemy.health}
        max={250}
        />
      <div>
        <span>Health: {enemy.health}</span>
        <span>Damage: {enemy.damage}</span>
      </div>
  </div>
  );
};

export default RedMinion;
