import PropTypes from 'prop-types';

const GameDetails = ({ selectedPonyName, dimensions, difficulty, ponyPosition }) => (
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
                {dimensions[0]} by {dimensions[1]}
            </p>
        </div>
        <div className="flex items-center mb-2">
            <p>
                <span className=" font-semibold">Difficulty: </span>
                {difficulty}
            </p>
        </div>
        <div className="flex items-center mb-2">
            <p>
                <span className="font-medium">Pony Position: </span>
                {ponyPosition}
            </p>
        </div>
    </div>
);

GameDetails.propTypes = {
    selectedPonyName: PropTypes.string.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
    difficulty: PropTypes.number.isRequired,
};

export default GameDetails;
