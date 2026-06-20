const Card = ({ preview, specie, prob }) => {
    const percentage = (prob * 100).toFixed(2);
    const isDog = specie?.toLowerCase() === "dog";

    return (
        <div className="flex justify-center mt-8">
            <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-4 w-full max-w-sm">
                <h1 className="text-2xl font-black text-center mb-3">
                    🎯 Prediction Result
                </h1>

                <div className="bg-white border-4 border-black rounded-3xl p-3 shadow-[5px_5px_0px_#000]">
                    {/* image box */}
                    <div className="w-40 h-40 mx-auto overflow-hidden rounded-2xl border-4 border-black bg-gray-50 flex items-center justify-center">
                        <img
                            src={preview}
                            alt={specie}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="text-2xl font-black text-center mt-4">
                        {isDog ? "🐶" : "🐱"} It's a {specie}
                    </h2>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <div className="bg-yellow-100 border-4 border-black rounded-2xl p-3 text-center shadow-[4px_4px_0px_#000]">
                            <h3 className="text-xs font-bold text-gray-700">
                                Prediction
                            </h3>
                            <p className="text-lg font-black mt-1">
                                {specie}
                            </p>
                        </div>

                        <div className="bg-blue-100 border-4 border-black rounded-2xl p-3 text-center shadow-[4px_4px_0px_#000]">
                            <h3 className="text-xs font-bold text-gray-700">
                                Confidence
                            </h3>
                            <p className="text-lg font-black mt-1">
                                {percentage}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;