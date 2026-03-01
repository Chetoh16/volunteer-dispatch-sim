const EndScreen = ({
  time,
}: {
  time: number;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/40 backdrop-blur-md">

      <div className="bg-white rounded-3xl shadow-2xl 
                      px-12 py-10 text-center w-[400px]">

        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Game Over
        </h1>

        <div className="text-lg text-gray-600 mb-4">
          Time: {time}
        </div>

        <div className="text-lg text-gray-600 mb-8">
          Score: SCORE
        </div>

        <button
          className="bg-indigo-600 hover:bg-indigo-700
                     text-white font-semibold 
                     px-6 py-3 rounded-xl 
                     transition duration-200">
          Play Again
        </button>

      </div>
    </div>
  );
};

export default EndScreen;