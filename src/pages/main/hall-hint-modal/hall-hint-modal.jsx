import React, { Component } from 'react';
import classes from './hall-hint-modal.module.scss';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';

export default class HallHintModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: [],
    };
  }

  componentDidMount() {
    this.setChart(this.props);
  }

  componentWillUnmount() {
    console.log('wtf');
  }

  handleClose = () => {
    this.props.onClose();
  };

  setChart({ answers, rightAnswer }) {
    const rightAnswerIndex = answers.indexOf(rightAnswer);
    let chart = [];
    let count = 100;
    for (let i = 0; i < answers.length; i++) {
      if (i !== answers.length - 1) {
        const random = i === rightAnswerIndex ? this.getRandomInt(50, 80) : this.getRandomInt(0, 10);
        count -= random;
        chart.push({ letter: this.getLetter(i), count: random });
      } else {
        chart.push({ letter: this.getLetter(i), count: count });
      }
    }
    this.setState({
      chart,
    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getLetter(index) {
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

  render() {
    return (
      <Dialog fullWidth maxWidth="sm" onClose={this.handleClose} open={this.props.open}>
        <DialogTitle>Подсказка Зала</DialogTitle>
        <DialogContent>
          <div className={classes.chart}>
            {this.state.chart.map((item, index) => {
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
  }
}
