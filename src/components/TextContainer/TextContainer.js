import React from "react"
import TryAgain from "../TryAgain/TryAgain"
import TypingChallengeContainer from "../TypingChallengeContainer/TypingChallengeContainer"
import "./TextContainer.css"

const TextContainer= ({selectedParagraph, words, characters, wpm, timeRemaining, timeStarted, testInfo, onInputChange, startAgain}) => {
    
    return (
        <div className="text-container">
            {
                timeRemaining > 0 ? (
                    <div data-aos="fade-up" className="typing-challengee-container">
                        <TypingChallengeContainer words={words} characters={characters} wpm={wpm} selectedParagraph={selectedParagraph} timeRemaining={timeRemaining} timeStarted={timeStarted} testInfo={testInfo} onInputChange={onInputChange} />
                    </div>
                ) : (
                    <div className="try-container">
                        <TryAgain words={words} characters={characters} wpm={wpm} startAgain={startAgain}/>
                    </div>
                )
            }
        </div>
    );
}

export default TextContainer;