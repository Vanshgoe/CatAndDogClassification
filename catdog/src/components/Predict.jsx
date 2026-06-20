import { useState } from "react";
import Button from "./Button.jsx";
import Card from "./Card.jsx";
import Facts from "./Facts.jsx";
import ConfusionMatrix from "./ConfusionMatrix.jsx";
import MetricCards from "./MetricCards.jsx";

const Predict = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const metrics = {
        accuracy: 0.8958,
        precision: 0.8709,
        recall: 0.9279,
        f1_score: 0.8985,
    };

    const confusionMatrix = [
        [522, 82],
        [43, 553]
    ];

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setPrediction(null);
    };

    const predict = async () => {
        if (!file) {
            alert("Please select an image");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("https://catanddogclassification-1.onrender.com/predict", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.error) {
                alert(data.error);
                return;
            }

            setPrediction(data);
        } catch (err) {
            console.error(err);
            alert("Prediction Failed");
        } finally {
            setLoading(false);
        }
    };

    const clearAll = () => {
        setFile(null);
        setPrediction(null);
        setPreview(null);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-6">

            <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className="space-y-8">
                    {/* Upload Card */}
                    <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000] p-6">
                        <h2 className="text-3xl font-black mb-4">Upload Image</h2>

                        <div className="flex gap-4 flex-wrap my-3">
                            <label className="cursor-pointer bg-white border-4 border-black rounded-2xl px-4 py-2 font-bold shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
                                Choose Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </label>

                            {file && (
                                <Button onClick={predict}>
                                    {loading ? "Predicting..." : "Predict"}
                                </Button>
                            )}

                            {(file || prediction) && (
                                <Button onClick={clearAll}>
                                    <img
                                        src="/cross.png"
                                        alt="clear"
                                        className="w-4 h-4"
                                    />
                                </Button>
                            )}
                        </div>
                    </div>


                    {prediction && <Facts />}
                </div>

                <div>

                    {!prediction && <Facts />}


                    {prediction && (
                        <Card
                            prob={prediction.probability}
                            preview={preview}
                            specie={prediction.prediction}
                        />
                    )}
                </div>
            </div>


            <div className="mt-12">
                <MetricCards metrics={metrics} />
            </div>


            <div className="mt-10">
                <ConfusionMatrix matrix={confusionMatrix} />
            </div>
        </div>
    );
};

export default Predict;