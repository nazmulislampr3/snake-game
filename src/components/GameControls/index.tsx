import { useGameContext } from "../../context/GameContext";

const GameControls = () => {
  const { moveTo } = useGameContext()!;
  return (
    <div className="flex flex-col gap-5 items-center relative size-32">
      <div className="flex flex-col h-full gap-16 items-center justify-center">
        {" "}
        <img
          src="/images/left-arrow.png"
          className="arrow-control rotate-90"
          alt="top"
          onClick={() => moveTo("top")}
        />
        <img
          src="/images/left-arrow.png"
          className="arrow-control -rotate-90"
          alt="bottom"
          onClick={() => moveTo("bottom")}
        />
      </div>
      <div className="flex w-full items-center justify-center gap-16 absolute top-1/2 -translate-y-1/2">
        <img
          src="/images/left-arrow.png"
          className="arrow-control"
          alt="left"
          onClick={() => moveTo("left")}
        />
        <img
          src="/images/left-arrow.png"
          className="arrow-control rotate-180"
          alt="right"
          onClick={() => moveTo("right")}
        />
      </div>
    </div>
  );
};

export default GameControls;
