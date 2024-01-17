import PropTypes from "prop-types";
import Button from "../button";

const Maze = ({ cellSize, gameData, btnAction }) => (
  <>
    <div
      className="maze"
      style={{
        gridTemplateColumns: `repeat(${gameData?.size[0]}, ${cellSize}px)`,
        height: `${gameData?.size[1] * cellSize}px`,
        width: `${gameData?.size[0] * cellSize}px`,
      }}
    >
      {gameData?.data?.map((cell, i) => (
        <div
          className={`maze-cell w-[${cellSize}px] relative ${cell.join(" ")}`}
          key={`maze-cell-${i}`}
        >
          {i === gameData.pony[0] ? (
            <div className="dot bg-pink-700 absolute"></div>
          ) : i === gameData.domokun[0] ? (
            <div className="dot bg-domokun absolute"></div>
          ) : (
            i === gameData["end-point"][0] && (
              <div className="dot bg-success absolute"></div>
            )
          )}
        </div>
      ))}
    </div>
    <div className="mx-auto mt-5">
      <Button
        click={() => btnAction()}
        extraClasses="w-auto mb-4 bg-red-800 hover:bg-red-600"
        size="small"
        text="End Game"
      />
    </div>
  </>
);

Maze.propTypes = {
  cellSize: PropTypes.number.isRequired,
  btnAction: PropTypes.func.isRequired,
  gameData: PropTypes.shape({
    size: PropTypes.arrayOf(PropTypes.number),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    pony: PropTypes.arrayOf(PropTypes.number),
    domokun: PropTypes.arrayOf(PropTypes.number),
    "end-point": PropTypes.arrayOf(PropTypes.number),
  }),
};

export default Maze;
