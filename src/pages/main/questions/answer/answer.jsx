import React from 'react';
import './answer.scss';

const ButtonState = {
  Normal: 'normal',
  Active: 'active',
  RightAnswer: 'right-answer',
  Hidden: 'hidden',
};

const Answer = (props) => {
  function answerClicked() {
    props.onAnswerClicked(props.text);
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

  function getButtonState(currentAnswer, rightAnswer, currentHint) {
    if (!props.text) {
      return ButtonState.Hidden;
    } else if (currentAnswer && rightAnswer && rightAnswer === props.text) {
      return ButtonState.RightAnswer;
    } else if (currentAnswer && currentAnswer === props.text) {
      return ButtonState.Active;
    }

    return ButtonState.Normal;
  }

  return (
    <div
      className={`answer ${getButtonState(props.currentAnswer, props.rightAnswer, props.currentHint)}`}
      onClick={answerClicked}
    >
      {getLetter(props.index)} : {props.text}
    </div>
  );
};

export default Answer;
