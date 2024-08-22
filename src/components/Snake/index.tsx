import { useEffect } from "react";
import { useGameContext } from "../../context/GameContext";
import Chunk from "./Chunk";

const Snake = () => {
  const { snakeBody, moveTo } = useGameContext()!;

  const handleKeyDown = (e: any) => {
    let direction = null;
    switch (e.key) {
      case "ArrowUp":
        direction = "top";
        break;

      case "ArrowDown":
        direction = "bottom";
        break;

      case "ArrowLeft":
        direction = "left";
        break;

      case "ArrowRight":
        direction = "right";
        break;
      default:
      //
    }

    if (direction) {
      moveTo(direction as any);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="w-full h-full absolute inset-0">
      {snakeBody.map((item, index) => (
        <Chunk axis={item} key={index} />
      ))}
    </div>
  );
};

export default Snake;
