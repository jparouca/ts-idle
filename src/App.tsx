import ChampionStatsContainer from "./components/ChampionStats";


function App() {
  return (
    <ChampionStatsContainer champion={{
      id: '0',
      name: 'Takaxo',
      damage: 12,
      health: 540,
      attackSpeed: 0.625
    }} />
  )
};


export default App;
