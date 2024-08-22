import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import randomNumber from "../utils/lib/randomNum";

type Func = () => void;
type MoveTo = (direction: "left" | "right" | "top" | "bottom") => void;

const GameContext = createContext<{
  result: boolean;
  snakeBody: number[][];
  gridsUnit: number;
  score: number;
  restart: Func;
  moveTo: MoveTo;
  direction: number[];
  food: number[];
  screenType: "pc" | "ph";
  paused: boolean;
  pauseToggle: () => void;
} | null>(null);

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const gridsUnit = 30;
  const [snakeBody, setSnakeBody] = useState<number[][]>([
    // [1, 0],
    // [0, 0],
    // [0, 1],
    // [0, 2],
    // [0, 3],
    // [1, 3],
    // [2, 3],
    // [3, 3],
    // [4, 3],
  ]);
  const [food, setFood] = useState<number[]>([]);
  const [result, setResult] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [screenType, setScreenType] = useState<"pc" | "ph">("pc");
  const direction = useRef<number[]>([0, 0]);

  const reset = () => {
    setSnakeBody([
      [randomNumber(0, gridsUnit - 1), randomNumber(0, gridsUnit - 1)],
    ]);

    if (!Math.abs(direction.current[0])) {
      direction.current[1] = [-1, 1][randomNumber(0, 1)];
    } else {
      direction.current[1] = 0;
    }

    setPaused(false);
    setResult(false);
    handleFood();
  };

  const restart = reset;
  const pauseToggle = () => setPaused((prev) => !prev);

  const score = snakeBody.length - 1;

  const moveTo: MoveTo = (axis) => {
    const x = Math.abs(direction.current[0]) === 1;
    if (!x) {
      if (axis === "left") {
        return (direction.current = [-1, 0]);
      }
      if (axis === "right") {
        return (direction.current = [1, 0]);
      }
    }

    const y = Math.abs(direction.current[1]) === 1;
    if (!y) {
      if (axis === "top") {
        return (direction.current = [0, -1]);
      }
      if (axis === "bottom") {
        return (direction.current = [0, 1]);
      }
    }
  };

  const handleFood = (): void => {
    const food = [
      randomNumber(0, gridsUnit - 1),
      randomNumber(0, gridsUnit - 1),
    ];

    let loop = false;
    while (loop) {
      let sameToSnakeXY = snakeBody.some(
        (item) => item[0] === food[0] && item[1] === food[1]
      );

      if (sameToSnakeXY) {
        food[0] = randomNumber(0, gridsUnit - 1);
        food[1] = randomNumber(0, gridsUnit - 1);
      }

      loop = sameToSnakeXY;
    }
    setFood(food);
  };

  const eatFood = () => {
    const head = snakeBody[0];
    if (head) {
      const eaten = head[0] === food[0] && head[1] === food[1];
      if (eaten) {
        setSnakeBody((prev) => {
          const copy = [...prev];
          const tail = [...copy[copy.length - 1]];
          copy.push(tail);
          return copy;
        });
        handleFood();
      }
    }
  };

  const overTheGame = () => {
    let over = false;
    if (snakeBody.length > 3) {
      const head = snakeBody[0];
      over = snakeBody
        .slice(1, snakeBody.length)
        .some((item) => item[0] === head[0] && item[1] === head[1]);

      if (over) {
        direction.current = [0, 0];
        setResult(true);
      }
    }
  };

  useEffect(() => {
    const directionExist =
      Math.abs(direction.current[0]) || Math.abs(direction.current[1]);

    if (directionExist && snakeBody[0] && !paused) {
      const interval = setInterval(() => {
        setSnakeBody((prev) => {
          const copy = [...prev];
          const head = copy[0];
          const tail: any = copy.pop();
          const x = head[0] + direction.current?.[0]!;
          const y = head[1] + direction.current?.[1]!;
          tail[0] = x < 0 ? gridsUnit - 1 : x % gridsUnit;
          tail[1] = y < 0 ? gridsUnit - 1 : y % gridsUnit;
          copy.unshift(tail);
          return copy;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [direction, snakeBody, paused]);

  useEffect(() => {
    eatFood();
    overTheGame();
  }, [snakeBody, food]);

  useEffect(() => {
    reset();
    const init = () => {
      setScreenType(window.innerWidth < window.innerHeight ? "ph" : "pc");
    };
    init();

    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gridsUnit,
        snakeBody,
        score,
        moveTo,
        restart,
        result,
        food,
        direction: direction.current,
        screenType,
        paused,
        pauseToggle,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameContextProvider;

export const useGameContext = () => useContext(GameContext);
