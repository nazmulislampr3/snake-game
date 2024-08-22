import { useGameContext } from "../../context/GameContext";

const Controls = () => {
  const { paused, pauseToggle, restart } = useGameContext()!;
  return (
    <div className="flex gap-4">
      <button className="btn1 bg-blue-600" onClick={pauseToggle}>
        {!paused ? (
          <>
            <img src="/images/pause.png" alt="" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <img src="/images/play.png" alt="" />
            <span>Resume</span>
          </>
        )}
      </button>
      <button className="btn1 bg-green-600" onClick={restart}>
        <img src="/images/play.png" alt="" />
        <span>Restart</span>
      </button>
    </div>
  );
};

export default Controls;
