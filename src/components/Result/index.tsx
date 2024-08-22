import { useGameContext } from "../../context/GameContext";

const Result = () => {
  const { score, restart } = useGameContext()!;
  return (
    <div
      className="fixed size-full inset-0 flex items-center justify-center"
      style={{
        background: "rgba(0, 0,0, 0.85)",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="font-bold text-3xl md:text-5xl text-teal-500">
          Game over!
        </span>
        <span className="text-slate-200 font-bold text-xl md:text-2xl mt-3 md:mt-5">
          Score: {score}
        </span>
        <button className="btn1 bg-green-600 mt-5" onClick={restart}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default Result;
