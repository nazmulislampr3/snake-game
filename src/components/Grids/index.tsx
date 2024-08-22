import { useGameContext } from "../../context/GameContext";
import cn from "../../utils/lib/cn";
import Snake from "../Snake";

const Grids = () => {
  const { gridsUnit, food, screenType } = useGameContext()!;
  const size = 100 / gridsUnit;
  const array = Array.from({ length: gridsUnit * gridsUnit });
  return (
    <div
      className={cn(
        "aspect-square bg-slate-900 border-slate-400 border-2 md:border-4 grid relative overflow-hidden shrink-0",
        {
          "h-full": screenType === "pc",
          "w-full": screenType === "ph",
        }
      )}
      style={{
        boxShadow: `rgba(0,0,0,0.75) 0px 0px 20px 2px`,
        gridTemplateColumns: `repeat(${gridsUnit}, 1fr)`,
        gridTemplateRows: `repeat(${gridsUnit}, 1fr)`,
      }}
    >
      {array.map((_, index) => (
        <div
          className="aspect-square bg-slate-600-900 w-full border-slate-500"
          key={index}
        />
      ))}
      <Snake />
      <div
        className="absolute bg-green-500 rounded-full shadow-lg shadow-gray-600"
        style={{
          width: `${size}%`,
          height: `${size}%`,
          left: `${size * food[0]}%`,
          top: `${size * food[1]}%`,
        }}
      />
    </div>
  );
};

export default Grids;
