interface Props {
  text: string;
  type?:  'date' | 'info';
}

const SystemMessage = ({ text, type = 'info' }:  Props) => {
  return (
    <div className="flex justify-center my-4 px-6">
      <div className="text-center">
        <p className={`text-sm ${type === 'date' ? 'text-gray-400 font-medium' : 'text-gray-500'}`}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default SystemMessage;