import React from 'react';
import HintButton from './hint/hint';
import Results from './results/results';
import './view.scss';
import { Hints } from '../main.constants.js';

const View = (props) => {
  return (
    <div className="info">
      <div className="left-side">
        <div className="hints">
          {[Hints.Half, Hints.Hall, Hints.Call].map((hint, index) => {
            return (
              <HintButton
                key={index}
                name={hint}
                hintsActivated={props.hintsActivated}
                hintClicked={props.hintClicked}
              />
            );
          })}
        </div>
        <img alt="logo" src="/images/logo.png" />
      </div>
      <div className="right-side">
        <Results currentRoundIndex={props.currentRoundIndex} />
      </div>
    </div>
  );
};

export default View;
