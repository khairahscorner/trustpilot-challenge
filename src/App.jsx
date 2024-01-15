import Button from "./components/button";
import Logo from "./assets/logo.jpeg";

function App() {

  const openGameModal = () => {};

  return (
    <>
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="bg-white w-2/5 border rounded p-6 text-center">
          <div className="h-24 flex justify-center items-center mb-6">
            <img src={Logo} alt="Pony Logo" />
          </div>
          <h1 className="flex justify-center items-center text-3xl mb-8">
            Save The Pony Challenge
          </h1>
          <p className="text-center text-lg mb-4 font-medium">
            Help the pony escape the Domokun!
          </p>
          <div className="border-b border-neutral-200 my-8"></div>
          <div className="">
            <Button
              click={() => openGameModal()}
              type="primary"
              extraClasses="mb-4"
            >
              <span className="text-p1">Start Game</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
