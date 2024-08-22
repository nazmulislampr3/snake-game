import { useGameContext } from "../../context/GameContext";
import Controls from "../Controls";

const Info = () => {
  const { score } = useGameContext()!;
  return (
    <div className="mt-5 flex flex-col items-center gap-4">
      <div className="font-bold text-xl text-gray-300">Score : {score}</div>
      <Controls />
    </div>
  );
};

export default Info;
