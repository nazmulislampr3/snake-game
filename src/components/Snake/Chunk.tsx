import { useGameContext } from "../../context/GameContext";
import cn from "../../utils/lib/cn";

const Chunk = ({ axis }: { axis: number[] }) => {
  const { gridsUnit } = useGameContext()!;

  const size = 100 / gridsUnit;
  const x = size * axis[0];
  const y = size * axis[1];

  return (
    <div
      className={cn(
        `aspect-square bg-blue-600 absolute border-slate-400 rounded-sm lg:rounded-lg`
      )}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
        borderWidth: "1px",
      }}
    ></div>
  );
};

export default Chunk;
