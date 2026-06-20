const Home = () => {
    return (
        <div className="w-full flex justify-center px-3 sm:px-4 pt-6 sm:pt-8 pb-6">
            <div className="bg-white border-4 border-black rounded-3xl shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] px-4 sm:px-6 md:px-8 py-5 sm:py-6 text-center max-w-3xl w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                    Cat & Dog Predictor
                </h1>

                <p className="text-sm sm:text-lg md:text-xl text-zinc-600 font-semibold mt-3">
                    Upload a pet image and let AI identify it.
                </p>
            </div>
        </div>
    );
};

export default Home;