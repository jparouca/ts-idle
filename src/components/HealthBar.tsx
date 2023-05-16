interface HealthBarProps {
  current: number;
  max: number;
};

const HealthBar: React.FC<HealthBarProps> = ({current, max}) => {
  const width = (current / max) * 100;

  return (
    <div className='w-full h-4 bg-red-200 rounded'>
      <div className='h-full bg-red-500 rounde' style={{width: `${width}%`}}>
      </div>
    </div>
  );
};

export default HealthBar;
