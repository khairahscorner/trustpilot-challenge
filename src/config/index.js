export const ponyNames = [
    "Twilight Sparkle",
    "Applejack",
    "Fluttershy",
    "Rarity",
    "Pinkie Pie",
    "Rainbow Dash",
    "Spike"
]

export const difficultyOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//helpers
export const keycodeToDirection = (keycode) => {
    let direction = null;
    switch (keycode) {

        // left
        case 37:
            direction = "west";
            break;
        // right
        case 39:
            direction = "east";
            break;
        // up
        case 38:
            direction = "north";
            break;
        // down
        case 40:
            direction = "south";
            break;

        default: break;
    }
    return direction;
}

export const isMoveValid = (mazeData, direction) => {
    // Get the wall data of the current cell and position of the cell intended to move to
    let currentPonyPosition = mazeData?.pony[0];

    const currentCellData = mazeData.data[currentPonyPosition];
    const intendedPosition = getAdjacentCellIndex(currentPonyPosition, direction, mazeData?.size[0]);

    // Check if there is wall in the intended direction
    return (
      !hasWall(currentCellData, direction) &&
      !hasWall(mazeData.data[intendedPosition], oppositeDirection(direction))
    );
  };

  // Get the position of the opposite cell based on the intended move
  const getAdjacentCellIndex = (position, direction, mazeWidth) => {
    switch (direction) {
      case "west":
        return position - 1;
      case "east":
        return position + 1;
      case "north":
        return position - mazeWidth;
      case "south":
        return position + mazeWidth;
      default:
        return position;
    }
  };

  const hasWall = (cellData, direction) => {
    return cellData.includes(direction);
  };

  // Get the opposite direction
  const oppositeDirection = (direction) => {
    switch (direction) {
      case "west":
        return "east";
      case "east":
        return "west";
      case "north":
        return "south";
      case "south":
        return "north";
      default:
        return direction;
    }
  };