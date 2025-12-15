interface Props {
  show: boolean;
}

const TypingIndicator = ({ show }: Props) => {
  if (!show) return null;

  return (
    <div className="flex items-center space-x-2 px-4 py-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
        U
      </div>
      <div className="bg-gray-200 rounded-2xl px-4 py-3 rounded-bl-none">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay:  '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;  