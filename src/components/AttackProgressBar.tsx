interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className='w-full h-2 bg-gray-300 rounded'>
      <div style={{ width: `${progress}%` }} className="h-full bg-gray-800 rounded"></div>
    </div>
  );
};

export default ProgressBar;
