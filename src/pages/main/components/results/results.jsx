import React from 'react';
import classes from './results.module.scss';
import { ResultsList } from './results.constants';
import classNames from 'classnames';

const Results = ({ currentRoundIndex }) => {
  function isNonBurnable(round) {
    switch (round) {
      case 5:
      case 10:
      case 15:
        return true;
      default:
        return false;
    }
  }

  return (
    <div className={classes.results}>
      {ResultsList.map((result, index) => {
        let resultItemClasses = classNames(classes['results-item'], {
          [classes['active-round']]: currentRoundIndex === index,
          [classes['non-burnable']]: isNonBurnable(result.round),
        });

        return (
          <div className={resultItemClasses} key={index}>
            <span className={classes.round}>{result.round}</span>
            <span>{`$ ${result.money}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
