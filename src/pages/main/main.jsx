import React, { Component } from 'react';
import './main.scss';
import { Descriptions, Hints } from './main.constants';
import Questions from './questions/questions';
import axios from 'axios';
import View from './view/view';
import HallHintModal from './hall-hint-modal/hall-hint-modal';
import CallHintModal from './calll-hint-modal/call-hint-modal';
import EndGameModal from './end-game-modal/end-game-modal';
import CircularProgress from '@mui/material/CircularProgress';
import fullGameSound from './sounds/full-game.mp3';
import rightAnswerSound from './sounds/right-answer.mp3';
import wrongAnswerSound from './sounds/wrong-answer.mp3';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allRounds: [],
      currentRoundIndex: 0,
      rounds: [],
      currentAnswer: null,
      rightAnswer: null,
      hintsActivated: [],
      isWon: false,
      isHallHintActive: false,
      isCallHintActive: false,
      isEndGameActive: false,
      fullGameSound: new Audio(fullGameSound),
    };
  }

  componentDidMount() {
    this.getRounds();
  }

  descriptions = Descriptions.map((x, i) => {
    return <p key={i}>{x}</p>;
  });

  async getRounds() {
    this.setState({ rounds: [] });
    this.state.fullGameSound.load();
    this.state.fullGameSound.play();

    try {
      const response = await axios.get('http://localhost:5200/api/round/game');
      this.setState({
        allRounds: JSON.parse(JSON.stringify(response.data)),
        rounds: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  resetAnswers() {
    this.setState({
      currentAnswer: null,
      rightAnswer: null,
    });
  }

  answerClicked = (text) => {
    this.setState({
      currentAnswer: text,
    });
    const rightAnswer = this.state.rounds[this.state.currentRoundIndex].rightAnswer;
    setTimeout(() => {
      this.setState({ rightAnswer });
      if (rightAnswer === text) {
        this.onRightAnswer();
      } else {
        this.onWrongAnswer();
      }
    }, 1900);
  };

  getScores(isWon) {
    if (this.state.currentRoundIndex < 5) return 0;
    else if (this.state.currentRoundIndex >= 5 && this.state.currentRoundIndex < 10) return 1000;
    else if (!isWon && this.state.currentRoundIndex >= 10 && this.state.currentRoundIndex < 15) return 32000;
    else return 1000000;
  }

  onHintClick = (name) => {
    this.setState((state) => ({
      hintsActivated: [...state.hintsActivated, name],
    }));

    switch (name) {
      case Hints.Half:
        this.onHalfHintClick();
        break;
      case Hints.Hall:
        this.onHallHintClick();
        break;
      case Hints.Call:
        this.onCallHintClick();
        break;
      default:
        break;
    }
  };

  onHalfHintClick = () => {
    const currentRound = this.state.rounds[this.state.currentRoundIndex];
    const rightAnswer = currentRound.rightAnswer;
    const wrongAnswers = currentRound.answers.filter((x) => x !== rightAnswer);
    const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    const answers = [rightAnswer, randomWrongAnswer];

    currentRound.answers = currentRound.answers.map((answer) => {
      return answers.includes(answer) ? answer : null;
    });

    this.setState({
      rounds: this.state.rounds,
    });
  };

  onHallHintClick = () => {
    this.setState({ isHallHintActive: true });
  };

  onCallHintClick = () => {
    this.setState({ isCallHintActive: true });
  };

  closeModals = () => {
    this.setState({
      isHallHintActive: false,
      isCallHintActive: false,
    });
  };

  restartGame = () => {
    this.setState({
      isEndGameActive: false,
      currentRoundIndex: 0,
      currentAnswer: null,
      rightAnswer: null,
      hintsActivated: [],
    });
    this.getRounds();
  };

  loadSound = (src) => {
    this.state.fullGameSound.pause();
    const sound = new Audio(src);
    sound.play();
  };

  onRightAnswer = () => {
    this.loadSound(rightAnswerSound);
    setTimeout(() => {
      if (this.state.currentRoundIndex === this.state.rounds.length - 1) {
        this.setState((state) => ({
          isWon: true,
          isEndGameActive: true,
        }));
      } else {
        this.setState((state) => ({
          currentRoundIndex: state.currentRoundIndex + 1,
          currentAnswer: null,
          rightAnswer: null,
        }));
        this.state.fullGameSound.play();
      }
    }, 2000);
  };

  onWrongAnswer = () => {
    this.loadSound(wrongAnswerSound);
    setTimeout(() => {
      this.setState({
        isWon: false,
        isEndGameActive: true,
      });
    }, 2000);
  };

  render() {
    return (
      <div className="component">
        <h1>Игра "Кто хочет стать миллионером"</h1>
        {this.descriptions}
        <div className="game">
          {this.state.rounds.length ? (
            <div>
              <View
                currentRoundIndex={this.state.currentRoundIndex}
                hintsActivated={this.state.hintsActivated}
                hintClicked={this.onHintClick}
              />
              {this.state.rounds.length ? (
                <Questions
                  round={this.state.rounds[this.state.currentRoundIndex]}
                  currentAnswer={this.state.currentAnswer}
                  rightAnswer={this.state.rightAnswer}
                  onAnswerClicked={this.answerClicked}
                />
              ) : null}

              {this.state.isHallHintActive ? (
                <HallHintModal
                  answers={this.state.rounds[this.state.currentRoundIndex].answers}
                  rightAnswer={this.state.rounds[this.state.currentRoundIndex].rightAnswer}
                  open={this.state.isHallHintActive}
                  onClose={this.closeModals}
                />
              ) : null}
              {this.state.isCallHintActive ? (
                <CallHintModal
                  rightAnswer={this.state.rounds[this.state.currentRoundIndex].rightAnswer}
                  open={this.state.isCallHintActive}
                  onClose={this.closeModals}
                />
              ) : null}
              {this.state.isEndGameActive ? (
                <EndGameModal
                  isWon={this.state.isWon}
                  scores={this.getScores(this.state.isWon)}
                  open={this.state.isEndGameActive}
                  restartGame={this.restartGame}
                  onClose={this.closeModals}
                />
              ) : null}
            </div>
          ) : (
            <CircularProgress color="inherit" />
          )}
        </div>
      </div>
    );
  }
}
