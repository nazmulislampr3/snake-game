import Game from "./components/Game";

const App = () => {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center md:p-2"
      style={{
        background: "linear-gradient(to right bottom, #4F1787, #708871)",
      }}
    >
      <Game />
    </div>
  );
};

export default App;
