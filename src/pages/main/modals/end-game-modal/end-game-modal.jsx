import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import congratsSound from '../../sounds/congrats.mp3';
import sorrySound from '../../sounds/sorry.mp3';

const EndGameModal = ({ isWon, scores, restartGame, open, handleClose }) => {
  useEffect(() => {
    const src = isWon ? congratsSound : sorrySound;
    const audio = new Audio(src);
    audio.load();
    audio.play();
  }, [isWon]);

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
      <DialogContent>
        {isWon ? (
          <h2>Поздравляю, вы выиграли один миллион долларов!!!</h2>
        ) : (
          <h2>К сожалению, вы проиграли. Ваш результат {scores}$. Попробуйте ещё раз!</h2>
        )}
        <Button variant="outlined" onClick={restartGame}>
          Начать заново
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EndGameModal;
