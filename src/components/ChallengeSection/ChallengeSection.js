import React from "react"
import TextContainer from "../TextContainer/TextContainer"
import "./ChallengeSection.css"

const ChallengeSection= ({selectedParagraph, words, characters, wpm, timeRemaining, timeStarted, testInfo, accuracy, onInputChange, startAgain}) => {
    return (
        <div className="challenge-section-container">
            <div className="challenge-section-header">
                    Take a speed test now!
            </div>
            <TextContainer words={words} characters={characters} wpm={wpm} selectedParagraph={selectedParagraph} timeRemaining={timeRemaining} timeStarted={timeStarted} testInfo={testInfo} accuracy={accuracy} onInputChange={onInputChange} startAgain={startAgain}/>
        </div>
    );
}

export default ChallengeSection;