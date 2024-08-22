import { useGameContext } from "../../context/GameContext";
import Controls from "../Controls";

const Board = () => {
  const { score } = useGameContext()!;

  return (
    <div className="w-full max-w-96 bg-slate-800 min-h-60 px-5 py-16 border-4 border-gray-400">
      <div className="flex flex-col items-center">
        <div className="font-bold text-2xl text-gray-100">Score: {score}</div>
        <img
          className="w-full h-auto object-cover mt-2"
          src="/images/snake.png"
        />

        <Controls />
      </div>
    </div>
  );
};

export default Board;
