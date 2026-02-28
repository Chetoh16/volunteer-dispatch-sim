import React from "react";

interface StartScreenProps {
    onStart: () => void; // function to start the game
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-11/12 max-w-lg text-center">
                <h1 className="text-3xl font-bold mb-4">Volunteer Dispatch Simulator</h1>
                <p className="text-lg mb-6"> Welcome! Your goal is to respond to opportunities in different countries before time runs out. 
                    Countries will turn red when there’s a new opportunity. Click them to take action and earn points. 
                </p>
                <p className="text-lg mb-6"> Help achieve United Nations' 17 Sustainable Development Goal 11 (Sustainable Cities and Communities) and 16 (Peace, Justice, and Strong Institutions) 
                    and make an impact! 
                </p>
                <button onClick={onStart} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition">
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default StartScreen;