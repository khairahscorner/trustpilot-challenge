// Import necessary testing utilities
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Import your App component
import App from './App';

beforeEach(() => {
  render(<App />);
});
afterEach(cleanup);

test('Fail to start game', async () => {
  const startButton = screen.getByText('Start');
  expect(startButton).toBeInTheDocument();

  userEvent.click(startButton);

  await waitFor(() => {
    const gameStartButton = screen.getByText('Start Game');
    expect(gameStartButton).toBeInTheDocument();
  });

  const form = screen.getByLabelText('Width:').closest('form');
  expect(form).toBeInTheDocument();

  // both invalid width & height
  fireEvent.change(screen.getByLabelText('Width:'), { target: { value: '10' } })
  fireEvent.change(screen.getByLabelText('Height:'), { target: { value: '30' } })

  console.log(screen.getByLabelText('Width:'))

  fireEvent.change(screen.getByLabelText('Choose Difficulty (Optional):'), { target: { value: '1' } })
  fireEvent.change(screen.getByLabelText('Choose Pony:'), { target: { value: 'Spike' } })

  fireEvent.submit(form);

  await waitFor(() => {
    const errorMessages = screen.getAllByText('Please provide a whole number between 15 and 25');
    expect(errorMessages.length).toBeGreaterThan(0);

    // for only one invalid
    // const errorMessage = screen.getByText('Please provide a whole number between 15 and 25');
    // expect(errorMessage).toBeInTheDocument();

    // Ensure that the game did not start
    const gameNotStarted = screen.queryByText('Button Navigation');
    expect(gameNotStarted).toBeNull();
  });

});

test('Successfully start game', async () => {
  const startButton = screen.getByText('Start');
  userEvent.click(startButton);

  await waitFor(() => {
    const gameStartButton = screen.getByText('Start Game');
    expect(gameStartButton).toBeInTheDocument();
  });

  const form = screen.getByLabelText('Width:').closest('form');
  expect(form).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Width:'), { target: { value: '15' } })
  fireEvent.change(screen.getByLabelText('Height:'), { target: { value: '22' } })
  fireEvent.change(screen.getByLabelText('Choose Difficulty (Optional):'), { target: { value: '4' } })
  fireEvent.change(screen.getByLabelText('Choose Pony:'), { target: { value: 'Rarity' } })

  fireEvent.submit(form);

  await waitFor(() => {
    const gameStarted = screen.getByText('Button Navigation');
    expect(gameStarted).toBeInTheDocument();
  });
});

// test("Pony move", async () => {
//   const startButton = screen.getByText('Start');
//   userEvent.click(startButton);

//   await waitFor(() => {
//     const gameStartButton = screen.getByText('Start Game');
//     expect(gameStartButton).toBeInTheDocument();
//   });

//   const form = screen.getByLabelText('Width:').closest('form');
//   expect(form).toBeInTheDocument();

//   fireEvent.change(screen.getByLabelText('Width:'), { target: { value: '15' } })
//   fireEvent.change(screen.getByLabelText('Height:'), { target: { value: '22' } })

//   fireEvent.submit(form);

//   await waitFor(() => {
//     const gameStarted = screen.getByText('Button Navigation');
//     expect(gameStarted).toBeInTheDocument();
//   });

//   const initialPonyPosition = screen.getByText("Pony Position:").closest('p').textContent;
//   const moves = ["Left", "Right", "Up", "Down"];
//   let positionChanged = false;

//   for (const move of moves) {
//     userEvent.click(screen.getByText(move));

//     await waitFor(() => {
//       const updatedPonyPosition = screen.getByText("Pony Position:").closest('p').textContent;

//       if (updatedPonyPosition !== initialPonyPosition) {
//         positionChanged = true;
//       }
//     });

//     if (positionChanged) {
//       break;
//     }
//   }

//   // Now you can assert that the position has changed for at least one move
//   expect(positionChanged).toBe(true);

// });
