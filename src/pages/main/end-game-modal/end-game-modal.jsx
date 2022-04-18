import React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import congratsSound from '../sounds/congrats.mp3';
import sorrySound from '../sounds/sorry.mp3';

const EndGameModal = (props) => {
  function startAudio() {
    const src = props.isWon ? congratsSound : sorrySound;
    const audio = new Audio(src);
    audio.load();
    audio.play();
  }

  startAudio();

  return (
    <Dialog fullWidth maxWidth="sm" onClose={props.handleClose} open={props.open}>
      <DialogContent>
        {props.isWon ? (
          <h2>Поздравляю, вы выиграли один миллион долларов!!!</h2>
        ) : (
          <h2>К сожалению, вы проиграли. Ваш результат {props.scores}$. Попробуйте ещё раз!</h2>
        )}
        <Button variant="outlined" onClick={props.restartGame}>
          Начать заново
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EndGameModal;
