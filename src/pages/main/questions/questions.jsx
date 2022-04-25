import React, { useState } from 'react';
import Answer from './answer/answer';
import classes from './questions.module.scss';

const Questions = ({ round, answerClicked }) => {
  const [currentAnswer, setCurrentAnswer] = useState();
  const [rightAnswer, setRightAnswer] = useState();

  const onAnswerClicked = (text) => {
    setCurrentAnswer(text);

    setTimeout(() => {
      setRightAnswer(round.rightAnswer);
      const isAnswerRight = round.rightAnswer === text;
      answerClicked(isAnswerRight);
    }, 2000);
  };

  return (
    <div className={classes.component}>
      <div className={classes.question}>
        <span>{round.question}</span>
      </div>
      <div className={classes.answers}>
        {round.answers.map((answer, index) => {
          return (
            <Answer
              key={index}
              index={index}
              text={answer}
              currentAnswer={currentAnswer}
              rightAnswer={rightAnswer}
              onAnswerClicked={onAnswerClicked}
            />
          );
        })}
        <div className={classes.roundNumber}>{round.roundNumber}</div>
      </div>
    </div>
  );
};

export default Questions;
