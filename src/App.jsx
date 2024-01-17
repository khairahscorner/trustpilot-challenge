import { useState, useEffect } from "react";
import axiosInstance from "./config/axios";
import Button from "./components/button";
import Logo from "./assets/logo.jpeg";
import { Controller, useForm } from "react-hook-form";
import { Textinput } from "./components/textinput";
import { Select } from "./components/select";
import { difficultyOptions, ponyNames } from "./config/index";
import Modal from "./components/modal";

function App() {
  const [gameOptions, setGameOptions] = useState(false);
  const [error, setError] = useState(null);
  const [mazeDimensions, setMazeDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [cellSize, setCellSize] = useState(24);

  const [activeGame, setActiveGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameData, setGameData] = useState(null);

  const [selectedPonyName, setSelectedPonyName] = useState(ponyNames[0]);
  const [difficulty, setDifficulty] = useState(0);

  const [locationArr, setLocationArr] = useState({
    pony: 0,
    domokun: 0,
    endPoint: 0,
  });
  const [gameOverResponse, setGameOverResponse] = useState("");

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
  }, [mazeDimensions.width]);

  const onSubmit = (data) => {
    let mazeOptions = {
      "maze-width": parseInt(data.width),
      "maze-height": parseInt(data.height),
      "maze-player-name": selectedPonyName ?? ponyNames[0],
      difficulty: parseInt(difficulty) ?? 0,
    };
    createNewMaze(mazeOptions);
  };

  const resetGameOptions = () => {
    setGameOptions(false);
    reset();
    setSelectedPonyName(ponyNames[0]);
    setDifficulty(0);
    setError(null);
  };

  const createNewMaze = (data) => {
    try {
      axiosInstance
        .post("", data)
        .then((res) => {
          getMazeData(res.data.maze_id);
        })
        .catch((err) => {
          setError(err?.response?.data);
        });
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const getMazeData = (id) => {
    try {
      axiosInstance
        .get(`/${id}`)
        .then((res) => {
          setGameData(res.data);
          setMazeDimensions({
            width: res.data.size[0],
            height: res.data.size[1],
          });
          setLocationArr(() => ({
            pony: res.data.pony[0],
            domokun: res.data.domokun[0],
            endPoint: res.data["end-point"][0],
          }));
          setActiveGame(true);
        })
        .catch((err) => {
          setError(err?.response?.data);
        });
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const makeNextMove = (direction) => {
    if (!activeGame) return null;

    try {
      axiosInstance
        .post(`/${gameData?.maze_id}`, { direction })
        .then((res) => {
          handleResponse(res.data);
        })
        .catch((err) => {
          setError(err?.response?.data);
        });
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleResponse = (response) => {
    if (response.state === "active") {
      getMazeData(gameData?.maze_id);
    }
    // pony won/lost
    else {
      setGameOverResponse(response["state-result"]);
      setIsGameOver(true);
    }
  };

  const startNewGame = () => {
    setActiveGame(false);
    setIsGameOver(false);
    resetGameOptions();
  };

  return (
    <>
      <div className="mx-auto">
        {activeGame ? (
          <div className="py-8 md:my-24 md:py-0 flex justify-center items-center">
            <div className="bg-white w-full md:w-max border rounded p-6 text-center">
              <div className="h-12 md:h-24 flex justify-center items-center mb-6">
                <img src={Logo} className="w-24 md:w-auto" alt="Pony Logo" />
              </div>
              <h1 className="flex justify-center items-center text-lg md:text-3xl mb-8">
                Save The Pony Challenge
              </h1>
              <p className="text-center text-sm md:text-lg mb-4 font-medium">
                Help the pony escape the Domokun!
              </p>
              <div className="border-b border-neutral-200 my-8"></div>
              <div className="flex flex-col-reverse md:grid md:grid-cols-3 md:gap-5">
                <div className="text-left col-span-3 md:col-span-1 mb-8">
                  <div className="mt-8 md:mt-0 mb-4">
                    <h4 className="mb-3 font-bold text-lg">
                      Button Navigation
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        click={() => makeNextMove("west")}
                        type="secondary"
                        extraClasses="mb-4"
                        size="small"
                        text="Left"
                      />
                      <Button
                        click={() => makeNextMove("east")}
                        type="secondary"
                        extraClasses="mb-4"
                        size="small"
                        text="Right"
                      />
                      <Button
                        click={() => makeNextMove("north")}
                        type="secondary"
                        extraClasses="mb-4"
                        size="small"
                        text="Up"
                      />
                      <Button
                        click={() => makeNextMove("south")}
                        type="secondary"
                        extraClasses="mb-4"
                        size="small"
                        text="Down"
                      />
                    </div>
                    {/* <h5 className="mb-3 font-semibold">Or </h5>
                    <Button
                      click={handleSubmit(resetGameOptions)}
                      type="secprimaryondary"
                      extraClasses="mb-4"
                      size="small"
                      text="Enable Keyboard Navigation"
                    /> */}
                  </div>
                  <div className="mb-4">
                    <h4 className="mb-3 font-bold text-lg">Game Details</h4>
                    <div className="flex items-center mb-2">
                      <p>
                        <span className=" font-semibold">Pony Name: </span>
                        {selectedPonyName}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <p>
                        <span className="font-medium">Maze Size: </span>
                        {mazeDimensions.width} by {mazeDimensions.height}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <p>
                        <span className=" font-semibold">Difficulty: </span>
                        {difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 hidden md:block">
                    <h4 className="mb-3 font-bold text-lg">Game Guide</h4>
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-domokun mr-3"></div>
                      <p>Domokun position</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-pink-700 mr-3"></div>
                      <p>Pony position</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-success mr-3"></div>
                      <p>Escape point</p>
                    </div>
                  </div>
                </div>
                <div className="px-0 md:px-5 col-span-3 md:col-span-2 mx-auto">
                  <div className="mb-4 block md:hidden">
                    <h4 className="mb-3 font-bold text-lg">Game Guide</h4>
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-domokun mr-3"></div>
                      <p>Domokun position</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-pink-700 mr-3"></div>
                      <p>Pony position</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-success mr-3"></div>
                      <p>Escape point</p>
                    </div>
                  </div>
                  <div
                    className="maze"
                    style={{
                      gridTemplateColumns: `repeat(${mazeDimensions?.width}, ${cellSize}px)`,
                      height: `${mazeDimensions?.height * cellSize}px`,
                      width: `${mazeDimensions?.width * cellSize}px`,
                    }}
                  >
                    {gameData?.data.map((cell, i) => (
                      <div
                        className={`maze-cell w-[${cellSize}px] relative ${cell.join(
                          " "
                        )}`}
                        key={`maze-cell-${i}`}
                      >
                        {i === locationArr.pony ? (
                          <div className="dot bg-pink-700 absolute"></div>
                        ) : i === locationArr.domokun ? (
                          <div className="dot bg-domokun absolute"></div>
                        ) : (
                          i === locationArr.endPoint && (
                            <div className="dot bg-success absolute"></div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mx-auto mt-5">
                    <Button
                      click={() => startNewGame()}
                      extraClasses="w-auto mb-4 bg-red-800 hover:bg-red-600"
                      size="small"
                      text="End Game"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-white w-full md:w-2/3 lg:w-1/2 border rounded p-6 text-center">
              <div className="h-12 md:h-24 flex justify-center items-center mb-6">
                <img src={Logo} className="w-24 md:w-auto" alt="Pony Logo" />
              </div>
              <h1 className="flex justify-center items-center text-lg md:text-3xl mb-4 md:mb-8">
                Save The Pony Challenge
              </h1>
              <p className="text-center text-sm md:text-lg mb-4 font-medium">
                Help the pony escape the Domokun!
              </p>
              <div className="border-b border-neutral-200 my-8"></div>
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
                        label="Choose Difficulty (Optional):"
                        selected={difficulty}
                        options={difficultyOptions}
                        onChange={(e) => setDifficulty(e.target.value)}
                      />
                      <Select
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
