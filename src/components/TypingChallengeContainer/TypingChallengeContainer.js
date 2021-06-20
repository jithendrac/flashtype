import React from "react"
import ChallengeDetailsCard from "../ChallengeDetilsCard/ChallengeDetailsCard"
import TypingChallenge from "../TypingChallenge/TypingChallenge"
import "./TypingChallengeContainer.css"

const TypingChallengeContainer= ({selectedParagraph, words, characters, wpm, timeRemaining, timeStarted, testInfo, onInputChange}) => {
    return (
        <div className="typing-challenge-container">
            <div className="details-container">
                <ChallengeDetailsCard cardName="words" cardValue={words}/>
                <ChallengeDetailsCard cardName="Characters" cardValue={characters}/>
                <ChallengeDetailsCard cardName="Speed" cardValue={wpm}/>
            </div>
            <div className="typewriter-container">
                <TypingChallenge selectedParagraph={selectedParagraph} timeRemaining={timeRemaining} timeStarted={timeStarted} testInfo={testInfo} onInputChange={onInputChange}/>
            </div>
        </div>
    );
}

export default TypingChallengeContainer;