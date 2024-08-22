import { useGameContext } from "../../context/GameContext";
import cn from "../../utils/lib/cn";
import Board from "../Board";
import GameControls from "../GameControls";
import Grids from "../Grids";
import Info from "../Info";
import Result from "../Result";

const Game = () => {
  const { screenType, result } = useGameContext()!;
  return (
    <div
      className={cn("w-full h-full flex justify-center items-center gap-8", {
        "flex-col": screenType === "ph",
      })}
    >
      {screenType === "ph" ? <Info /> : null}
      <Grids />
      {screenType === "pc" ? <Board /> : null}
      {screenType === "ph" ? <GameControls /> : null}
      {result ? <Result /> : null}
    </div>
  );
};

export default Game;
