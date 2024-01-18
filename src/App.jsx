import { useState, useEffect } from "react";
import Button from "./components/button";
import { Controller, useForm } from "react-hook-form";
import { Textinput } from "./components/textinput";
import { Select } from "./components/select";
import {
  difficultyOptions,
  keycodeToDirection,
  ponyNames,
} from "./config/index";
import Modal from "./components/modal";
import ButtonNavigation from "./components/UI/buttonNavigation";
import GameGuide from "./components/UI/gameGuide";
import Maze from "./components/UI/maze";
import GameDetails from "./components/UI/gameDetails";
import GameHeader from "./components/UI/gameHeader";
import {
  createNewMaze,
  getMazeData,
  makeNextMove,
} from "./components/actions/gameActions";

function App() {
  const [gameOptions, setGameOptions] = useState(false);
  const [error, setError] = useState(null);

  const [cellSize, setCellSize] = useState(0);
  const [mazeWidth, setMazeWidth] = useState(0);

  const [activeGame, setActiveGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [gameOverResponse, setGameOverResponse] = useState("");

  const [selectedPonyName, setSelectedPonyName] = useState(ponyNames[0]);
  const [difficulty, setDifficulty] = useState(0);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    mode: "onSubmit",
  });

  // adjust maze cell size based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setCellSize(15);
      } else {
        setCellSize(20);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mazeWidth]);

  useEffect(() => {
    const navigateWithKeyboard = (e) => {
      let direction;

      e.preventDefault();
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        direction = keycodeToDirection(e.keyCode);
        onPonyPlay(direction);
      }
    };
    if (keyboardActive) {
      document.addEventListener("keydown", navigateWithKeyboard);
    } else {
      document.removeEventListener("keydown", navigateWithKeyboard);
    }

    return () => {
      document.removeEventListener("keydown", navigateWithKeyboard);
    };
  }, [keyboardActive]);

  //All actions

  const startNewGame = () => {
    setActiveGame(false);
    setIsGameOver(false);
    resetGameOptions();
  };

  const resetGameOptions = () => {
    setGameOptions(false);
    setKeyboardActive(false);
    reset();
    setSelectedPonyName(ponyNames[0]);
    setDifficulty(0);
    setError(null);
  };

  // handle input/select fields and initiate game
  const onSubmit = (data) => {
    let mazeOptions = {
      "maze-width": parseInt(data.width),
      "maze-height": parseInt(data.height),
      "maze-player-name": selectedPonyName ?? ponyNames[0],
      difficulty: parseInt(difficulty) ?? 0,
    };

    createNewMaze(mazeOptions)
      .then((res) => {
        drawMaze(res?.data?.maze_id);
      })
      .catch((err) => {
        setError(err?.response?.data);
      });
  };

  const drawMaze = (mazeId) => {
    getMazeData(mazeId)
      .then((res) => {
        setGameData(res.data);
        setMazeWidth(res.data.size[0]);
        setActiveGame(true);
      })
      .catch((err) => {
        setError(err?.response?.data);
      });
  };

  const onPonyPlay = (direction) => {
    if (!activeGame) return null;

    makeNextMove(gameData?.maze_id, direction)
      .then((res) => {
        handleResponse(res.data);
      })
      .catch((err) => {
        setError(err?.response?.data);
      });
  };

  const handleResponse = (response) => {
    if (response.state === "active") {
      drawMaze(gameData?.maze_id);
    }
    // if pony won/lost
    else {
      setGameOverResponse(response["state-result"]);
      setIsGameOver(true);
    }
  };

  return (
    <>
      <div className="mx-auto">
        {gameData && activeGame ? (
          <div className="py-8 md:my-24 md:py-0 flex justify-center items-center">
            <div className="bg-white w-full md:w-max border rounded p-6 text-center">
              <GameHeader />
              <div className="flex flex-col-reverse md:grid md:grid-cols-3 md:gap-5">
                <div className="text-left col-span-3 md:col-span-1 mb-8">
                  <ButtonNavigation ponyAction={onPonyPlay} />
                  <div className="hidden md:block">
                    <h5 className="mb-3 font-semibold">Or </h5>
                    <Button
                      click={() => setKeyboardActive(true)}
                      type="secprimaryondary"
                      extraClasses="mb-4"
                      size="small"
                      text="Enable Keyboard Navigation"
                      disabled={keyboardActive}
                    />
                  </div>
                  <GameDetails
                    selectedPonyName={selectedPonyName}
                    dimensions={gameData?.size}
                    difficulty={difficulty}
                    ponyPosition={gameData?.pony[0]}
                  />
                  <div className="mb-4 hidden md:block">
                    <GameGuide />
                  </div>
                </div>
                <div className="px-0 md:px-5 col-span-3 md:col-span-2 mx-auto">
                  <div className="mb-4 md:hidden">
                    <GameGuide />
                  </div>
                  <Maze
                    cellSize={cellSize}
                    gameData={gameData}
                    btnAction={startNewGame}
                  />
                </div>
                <p className="md:hidden text-center italic text-xs mb-6 font-medium">
                  Use the button navigation below for controls
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-white w-full md:w-2/3 lg:w-1/2 border rounded p-6 text-center">
              <GameHeader />
              {!gameOptions ? (
                <Button
                  click={() => setGameOptions(true)}
                  type="primary"
                  extraClasses="mb-4"
                  text="Start"
                />
              ) : (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 grid grid-cols-2 gap-4 text-left">
                      <Controller
                        name="width"
                        defaultValue={15}
                        rules={{
                          required: true,
                          pattern: {
                            value: /^(1[5-9]|2[0-5])$/,
                          },
                        }}
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <Textinput
                            onChange={onChange}
                            value={value}
                            label="Width:"
                            inputid="width"
                            name="width"
                            type="number"
                            iserror={error}
                            placeholder="0"
                            message={
                              "Please provide a whole number between 15 and 25"
                            }
                          />
                        )}
                      />
                      <Controller
                        name="height"
                        defaultValue={15}
                        rules={{
                          required: true,
                          pattern: {
                            value: /^[1-9]\d*$/,
                          },
                          min: 15,
                          max: 25,
                        }}
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <Textinput
                            onChange={onChange}
                            value={value}
                            label="Height:"
                            inputid="height"
                            name="height"
                            type="number"
                            iserror={error}
                            placeholder="0"
                            message={
                              "Please provide a whole number between 15 and 25"
                            }
                          />
                        )}
                      />
                    </div>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <Select
                        id="difficulty"
                        label="Choose Difficulty (Optional):"
                        selected={difficulty}
                        options={difficultyOptions}
                        onChange={(e) =>
                          setDifficulty(parseInt(e.target.value))
                        }
                      />
                      <Select
                        id="pony-name"
                        label="Choose Pony:"
                        selected={selectedPonyName}
                        options={ponyNames}
                        onChange={(e) => setSelectedPonyName(e.target.value)}
                      />
                    </div>
                    <div className="border-b border-neutral-200 my-8"></div>
                    {error && (
                      <p className="mb-3 text-base italic font-semibold text-red-500">
                        {error}
                      </p>
                    )}
                    <div className="my-5 flex justify-center items-center">
                      <Button
                        click={handleSubmit(onSubmit)}
                        type="primary"
                        extraClasses="mb-4 mr-4"
                        disabled={Object.keys(errors).length > 0}
                        text="Start Game"
                      />
                      <Button
                        click={handleSubmit(resetGameOptions)}
                        type="secondary"
                        extraClasses="mb-4"
                        text="Cancel"
                      />
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isGameOver}
        action={() => startNewGame()}
        message={gameOverResponse}
      />
    </>
  );
}

export default App;
