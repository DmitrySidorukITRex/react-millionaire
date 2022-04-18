import React from 'react';
import classes from './hint.module.scss';
import classNames from 'classnames';
import sound from '../../sounds/select-hint.mp3';

const HintButton = (props) => {
  const onHintClicked = () => {
    const audio = new Audio(sound);
    audio.play();
    props.hintClicked(props.name);
  };

  return (
    <div
      className={classNames(classes.hint, classes[props.name], {
        [classes.disabled]: props.hintsActivated.includes(props.name),
      })}
      onClick={onHintClicked}
    ></div>
  );
};

export default HintButton;
