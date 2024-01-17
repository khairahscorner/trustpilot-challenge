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

//helper
export const keycodeToDirection = (keycode) => {
    let direction = null;
    switch (keycode) {

        // left arrow
        case 37:
            direction = "west";
            break;

        // up arrow
        case 38:
            direction = "north";
            break;

        // right arrow
        case 39:
            direction = "east";
            break;

        // down arrow
        case 40:
            direction = "south";
            break;

        default: break;
    }
    return direction;
}