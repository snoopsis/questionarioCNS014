import React from "react";
import PropTypes from "prop-types";
import tally from "../helpers/tally";

const Results = ({ userAnswers, score, restartQuiz }) => {
  const triesTotal = tally(userAnswers);
  const oneTry = triesTotal[1] && (
    <div>
      <strong>{triesTotal[1]}</strong> na primeira tentativa.
    </div>
  );
  const twoTries = triesTotal[2] && (
    <div>
      <strong>{triesTotal[2]}</strong> na segunda tentativa.
    </div>
  );
  const threeTries = triesTotal[3] && (
    <div>
      <strong>{triesTotal[3]}</strong> na terceira tentativa.
    </div>
  );
  const fourTries = triesTotal[4] && (
    <div>
      <strong>{triesTotal[4]}</strong> na quarta tentativa.
    </div>
  );

  return (
    <div className="results-container">
      <h2>Resultado do Questionário</h2>
      <div>Você respondeu...</div>
      {oneTry}
      {twoTries}
      {threeTries}
      {fourTries}
      <div className="results-total">
        A Sua Pontuação total e <strong>{score}</strong>.
      </div>
      <a onClick={restartQuiz}>Reiniciar Questionário</a>
    </div>
  );
};

Results.propTypes = {
  userAnswers: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired,
  restartQuiz: PropTypes.func.isRequired
};

export default Results;
