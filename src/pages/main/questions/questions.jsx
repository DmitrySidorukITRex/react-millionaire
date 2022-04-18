import React from 'react';
import Answer from './answer/answer';
import './questions.scss';

const Questions = (props) => {
  return (
    <div className="component">
      <div className="question">
        <span>{props.round.question}</span>
      </div>
      <div className="answers">
        {props.round.answers.map((answer, index) => {
          return (
            <Answer
              key={index}
              index={index}
              text={answer}
              currentAnswer={props.currentAnswer}
              rightAnswer={props.rightAnswer}
              onAnswerClicked={props.onAnswerClicked}
            />
          );
        })}
        <div className="roundNumber">{props.round.roundNumber}</div>
      </div>
    </div>
  );
};

export default Questions;
