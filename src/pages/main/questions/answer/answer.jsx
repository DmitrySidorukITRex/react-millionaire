import React from 'react';
import './answer.scss';

const ButtonState = {
  Normal: 'normal',
  Active: 'active',
  RightAnswer: 'right-answer',
  Hidden: 'hidden',
};

const Answer = ({ text, currentAnswer, rightAnswer, currentHint, index, onAnswerClicked }) => {
  function answerClicked() {
    onAnswerClicked(text);
  }

  function getLetter(index) {
    switch (index) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';

      default:
        break;
    }
  }

  function getButtonState(currentAnswer, rightAnswer) {
    if (!text) {
      return ButtonState.Hidden;
    } else if (currentAnswer && rightAnswer && rightAnswer === text) {
      return ButtonState.RightAnswer;
    } else if (currentAnswer && currentAnswer === text) {
      return ButtonState.Active;
    }

    return ButtonState.Normal;
  }

  return (
    <div className={`answer ${getButtonState(currentAnswer, rightAnswer)}`} onClick={answerClicked}>
      {getLetter(index)} : {text}
    </div>
  );
};

export default Answer;
