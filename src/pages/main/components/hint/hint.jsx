import React from 'react';
import classes from './hint.module.scss';
import classNames from 'classnames';
import sound from '../../sounds/select-hint.mp3';

const HintButton = ({ name, hintsActivated, hintClicked }) => {
  const onHintClicked = () => {
    const audio = new Audio(sound);
    audio.play();
    hintClicked(name);
  };

  return (
    <div
      className={classNames(classes.hint, classes[name], {
        [classes.disabled]: hintsActivated.includes(name),
      })}
      onClick={onHintClicked}
    ></div>
  );
};

export default HintButton;
