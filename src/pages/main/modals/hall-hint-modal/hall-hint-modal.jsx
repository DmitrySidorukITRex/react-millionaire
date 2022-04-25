import React, { useState, useEffect } from 'react';
import classes from './hall-hint-modal.module.scss';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';

const HallHintModal = ({ answers, rightAnswer, open, onClose }) => {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const calculateChart = (answers, rightAnswer) => {
      const rightAnswerIndex = answers.indexOf(rightAnswer);
      let chart = [];
      let count = 100;
      for (let i = 0; i < answers.length; i++) {
        if (i !== answers.length - 1) {
          const random = i === rightAnswerIndex ? getRandomInt(50, 80) : getRandomInt(0, 10);
          count -= random;
          chart.push({ letter: getLetter(i), count: random });
        } else {
          chart.push({ letter: getLetter(i), count: count });
        }
      }
      setChart(chart);
    };

    calculateChart(answers, rightAnswer);
  }, [answers, rightAnswer]);

  const handleClose = () => {
    onClose();
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        return '';
    }
  }

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
      <DialogTitle>Подсказка Зала</DialogTitle>
      <DialogContent>
        <div className={classes.chart}>
          {chart.map((item, index) => {
            return (
              <div key={index} className={classes['chart-item']}>
                <div className={classes.graph} style={{ height: item.count * 2 }}></div>
                <div className={classes.count}>{item.count + ' % '}</div>
                <div className={classes.letter}>{item.letter}</div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HallHintModal;
