import React from "react"
import './App.css';
import Nav from "../Nav/Nav"
import Landing from "../Landing/Landing";
import Footer from "../Footer/Footer";
import ChallengeSection from "../ChallengeSection/ChallengeSection";

const totalTime=20;
const serviceUrl="https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=text"
const defaultState={
  selectedParagraph:"",
  timeStarted:false,
  timeRemaining:totalTime,
  words:0,
  characters:0,
  wpm:0,
  testInfo:[],
  accuracy: 0
}

class App extends React.Component{
  state=defaultState;

  componentDidMount() {
      this.fetchNewParagraph();
    }

  fetchNewParagraph = () => {
    fetch(serviceUrl).then(response => response.text()).then(data => {
      const testInfo=data.split("").map(letter=> {
        return{
            testLetter:letter,
            status: "notAttempted"
        };
      });
      this.setState({...defaultState, selectedParagraph:data, testInfo})
    }
  );
}

startAgain = () => {
    this.fetchNewParagraph();
  }

    handleUserInput = (inputValue) => {
        if(!this.state.timeStarted) this.startTimer();

        const characters = inputValue.length;
        const words = inputValue.split(" ").length;
        const index = characters - 1;

        //when you enter backsapce: underflow case
        if(index < 0){
            this.setState({
              testInfo: [
                { 
                  testLetter: this.state.testInfo[0].testLetter,
                  status: "notAttempted"
                },
                ...this.state.testInfo.slice(1)
              ],
              characters,
              words
            })
            return;
        }

        //when you enter more no. of words:overflow condition
        if(index > this.state.selectedParagraph.length){
            this.setState({characters,words})
            return;
        }

        //handling backspace
        const testInfo=this.state.testInfo;
        if(!(index === this.state.selectedParagraph.length))
            testInfo[index+1].status = "notAttempted";

        //check for correct typed letter
        const isCorrect = inputValue[index] === testInfo[index].testLetter;
        //update status
        testInfo[index].status = isCorrect ? "correct" : "incorrect";

        const accuracy = ((testInfo.filter(letter => ( letter.status === "correct")).length) / characters)*100;

        this.setState({ testInfo, words, characters, accuracy})

    }

    startTimer = () => {
      this.setState({timeStarted:true})
      const timer = setInterval(() => {
        if(this.state.timeRemaining > 0){
          const timeSpent=totalTime-this.state.timeRemaining;
          const wpm=timeSpent > 0 ? (this.state.words / timeSpent)*totalTime : 0;
          this.setState({timeRemaining: this.state.timeRemaining - 1, wpm:parseInt(wpm)})
        }
        else{
            clearInterval(timer)
        }
      },1000)
    }

  render() {
    
    return (
      <div className="app">
        <Nav />
        <Landing />
        <ChallengeSection 
            selectedParagraph={this.state.selectedParagraph}
            words={this.state.words}
            characters={this.state.characters}
            wpm={this.state.wpm}
            timeRemaining={this.state.timeRemaining}
            timeStarted={this.state.timeStarted}
            testInfo={this.state.testInfo}
            accuracy={this.state.accuracy}
            onInputChange={this.handleUserInput}
            startAgain={this.startAgain}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
