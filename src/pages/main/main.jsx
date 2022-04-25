import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useState } from 'react';
import HintButton from './components/hint/hint';
import Results from './components/results/results';
import { Descriptions, Hints } from './main.constants';
import { MainContext } from './main.provider';
import './main.scss';
import CallHintModal from './modals/call-hint-modal/call-hint-modal';
import EndGameModal from './modals/end-game-modal/end-game-modal';
import HallHintModal from './modals/hall-hint-modal/hall-hint-modal';
import Questions from './questions/questions';
import fullGameSoundUrl from './sounds/full-game.mp3';
import rightAnswerSound from './sounds/right-answer.mp3';
import wrongAnswerSound from './sounds/wrong-answer.mp3';

const fullGameSound = new Audio(fullGameSoundUrl);

const Main = () => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [activatedHints, setActivatedHints] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [modals, setModals] = useState({ hallHint: false, callHint: false, endGame: false });
  const { rounds, getRounds } = useContext(MainContext);

  const answerClicked = (isAnswerRight) => {
    isAnswerRight ? onRightAnswer() : onWrongAnswer();
  };

  const getScores = (isWon) => {
    if (currentRoundIndex < 5) return 0;
    else if (currentRoundIndex >= 5 && currentRoundIndex < 10) return 1000;
    else if (!isWon && currentRoundIndex >= 10 && currentRoundIndex < 15) return 32000;
    else return 1000000;
  };

  const onHintClick = (name) => {
    setActivatedHints([...activatedHints, name]);

    switch (name) {
      case Hints.Half:
        onHalfHintClick();
        break;
      case Hints.Hall:
        onHallHintClick();
        break;
      case Hints.Call:
        onCallHintClick();
        break;
      default:
        break;
    }
  };

  const onHalfHintClick = () => {
    const currentRound = rounds[currentRoundIndex];
    const rightAnswer = currentRound.rightAnswer;
    const wrongAnswers = currentRound.answers.filter((x) => x !== rightAnswer);
    const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    const answers = [rightAnswer, randomWrongAnswer];

    currentRound.answers = currentRound.answers.map((answer) => {
      return answers.includes(answer) ? answer : null;
    });
  };

  const onHallHintClick = () => {
    setModals({ ...modals, hallHint: true });
  };

  const onCallHintClick = () => {
    setModals({ ...modals, callHint: true });
  };

  const closeModals = () => {
    setModals({ callHint: false, hallHint: false, endGame: false });
  };

  const restartGame = () => {
    setModals({ ...modals, endGame: false });
    setCurrentRoundIndex(0);
    setActivatedHints([]);
    getRounds();
  };

  const loadSound = (src) => {
    fullGameSound.pause();
    const sound = new Audio(src);
    sound.play();
  };

  const onRightAnswer = () => {
    loadSound(rightAnswerSound);
    setTimeout(() => {
      if (currentRoundIndex === rounds.length - 1) {
        setIsWon(true);
        setModals({ ...modals, endGame: true });
      } else {
        setCurrentRoundIndex((curr) => curr + 1);
        fullGameSound.play();
      }
    }, 2000);
  };

  const onWrongAnswer = () => {
    loadSound(wrongAnswerSound);
    setTimeout(() => {
      setIsWon(false);
      setModals({ ...modals, endGame: true });
    }, 2000);
  };

  const descriptions = Descriptions.map((x, i) => {
    return <p key={i}>{x}</p>;
  });
  const hints = [Hints.Half, Hints.Hall, Hints.Call];
  const hintsLayout = hints.map((hint, index) => (
    <HintButton key={index} name={hint} hintsActivated={activatedHints} hintClicked={onHintClick} />
  ));

  return (
    <div className="component">
      <h1>Игра "Кто хочет стать миллионером"</h1>
      {descriptions}
      <div className="game">
        {rounds.length ? (
          <div>
            <div className="hints">{hintsLayout}</div>
            <img className="logo" alt="logo" src="/images/logo.png" />
            <div className="results">
              <Results currentRoundIndex={currentRoundIndex} />
            </div>
            <Questions round={rounds[currentRoundIndex]} answerClicked={answerClicked} />

            {modals.hallHint ? (
              <HallHintModal
                answers={rounds[currentRoundIndex].answers}
                rightAnswer={rounds[currentRoundIndex].rightAnswer}
                open={modals.hallHint}
                onClose={closeModals}
              />
            ) : null}
            {modals.callHint ? (
              <CallHintModal
                rightAnswer={rounds[currentRoundIndex].rightAnswer}
                open={modals.callHint}
                onClose={closeModals}
              />
            ) : null}
            {modals.endGame ? (
              <EndGameModal
                isWon={isWon}
                scores={getScores(isWon)}
                open={modals.endGame}
                restartGame={restartGame}
                onClose={closeModals}
              />
            ) : null}
          </div>
        ) : (
          <CircularProgress color="inherit" />
        )}
      </div>
    </div>
  );
};

export default Main;
