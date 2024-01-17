import Logo from "../../assets/logo.jpeg";

const GameHeader = () => (
    <>
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
    </>
)

export default GameHeader;