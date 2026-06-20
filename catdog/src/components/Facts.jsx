import { useState } from "react";
import Button from "./Button.jsx";

const Facts = () => {
    const [fact, setFact] = useState("");
    const catFacts = [
        "Cats sleep for around 70% of their lives.",
        "A cat can jump up to 6 times its height.",
        "Cats have over 20 muscles controlling their ears.",
        "Every cat's nose print is unique.",
        "Cats can make more than 100 vocal sounds.",
        "Cats use their whiskers to judge whether they can fit through a space.",
        "A group of cats is called a clowder.",
        "Cats have five toes on their front paws but usually only four on the back.",
        "The oldest known pet cat existed over 9,000 years ago.",
        "Cats can rotate their ears 180 degrees.",
        "A cat’s purr can vibrate at frequencies linked to healing.",
        "Cats can run at speeds of up to 30 mph.",
        "Most cats dislike water, but some breeds like the Turkish Van enjoy it.",
        "Cats spend a lot of time grooming to regulate body temperature.",
        "Kittens are born blind and deaf.",
        "Cats can see well in very low light.",
        "A cat’s brain is more similar to a human brain than a dog’s in some ways.",
        "Cats walk like camels and giraffes by moving both right feet, then both left feet.",
        "House cats share about 95% of their DNA with tigers.",
        "Cats can’t taste sweetness.",
        "A cat’s tail helps with balance and communication.",
        "Cats sweat mostly through their paw pads.",
        "The world record for the loudest purr by a domestic cat is over 67 decibels.",
        "Cats can recognize their owner’s voice, even if they ignore it.",
        "Ancient Egyptians worshipped cats and considered them sacred.",
        "Cats have a third eyelid called the haw.",
        "Some cats are polydactyl, meaning they have extra toes.",
        "Cats dream while they sleep, just like humans.",
        "A cat can hear higher-pitched sounds than dogs and humans.",
        "Cats often rub against people to mark them with their scent."
    ];

    const dogFacts = [
        "Dogs can learn over 100 words and gestures.",
        "A dog's nose print is unique like fingerprints.",
        "Dogs can smell 40 times better than humans.",
        "The Basenji is known as the barkless dog.",
        "Dogs dream while sleeping.",
        "Dogs have three eyelids, including one to keep their eyes moist.",
        "A Greyhound can run up to 45 mph.",
        "Puppies are born deaf, blind, and toothless.",
        "Dogs use body language more than barking to communicate.",
        "A dog’s sense of smell is their strongest sense.",
        "The Labrador Retriever has been one of the most popular dog breeds for years.",
        "Dogs can hear sounds at frequencies much higher than humans can.",
        "The Saluki is one of the oldest known dog breeds.",
        "Dogs sweat mainly through their paw pads.",
        "Some dogs can detect diseases like cancer and diabetes.",
        "Dogs have been human companions for at least 14,000 years.",
        "A dog’s whiskers help them sense nearby objects.",
        "The world’s tallest dog was over 3 feet tall.",
        "Dogs can get jealous when their owners pay attention to other pets.",
        "Newfoundland dogs are excellent swimmers because of their webbed feet.",
        "A dog’s wet nose helps it absorb scent chemicals better.",
        "Dalmatian puppies are born completely white and develop spots later.",
        "Dogs can understand human pointing better than many other animals.",
        "Yawning can be contagious for dogs too.",
        "The Chihuahua is one of the smallest dog breeds in the world.",
        "Dogs can curl into a ball while sleeping to protect their organs and stay warm.",
        "Some dogs can be trained to detect seizures before they happen.",
        "The Norwegian Lundehund has six toes on each foot.",
        "Dogs can sense changes in weather and air pressure.",
        "Tail wagging doesn’t always mean a dog is happy—it can mean excitement, nervousness, or alertness."
    ];

    function showFact(id) {
        const facts = {
            cat: catFacts,
            dog: dogFacts
        };

        const randomIndex = Math.floor(Math.random() * facts[id].length);
        setFact(facts[id][randomIndex]);
    }

    return (
        <div className="flex justify-center ">
            <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000]  w-full max-w-l">
                <h2 className="text-3xl font-black text-center">
                    Are You Team Cat or Team Dog?
                </h2>

                <p className="text-center text-gray-600 font-semibold mt-2 pb-5  ">
                    Pick a side and get a fun fact!
                </p>

                <div className="flex flex-wrap justify-center pb-6 gap-4 v ">
                    <Button onClick={() => showFact("dog")}>
                        🐶 Dog
                    </Button>

                    <Button onClick={() => showFact("cat")}>
                        🐱 Cat
                    </Button>
                </div>

                {fact && (
                    <div className="bg-yellow-100 border-4 border-black rounded-3xl shadow-[5px_5px_0px_#000] m-3  ">
                        <div className="flex items-center justify-between flex-row">
                            <h3 className="text-2xl font-black">
                                ✨ Fun Fact
                            </h3>

                            <button
                                onClick={() => setFact("")}
                                className="w-10 h-10 flex items-center justify-center rounded-full border-4 border-black bg-white shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition"
                                aria-label="Close fact"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-xl font-bold leading-relaxed">
                            {fact}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Facts;