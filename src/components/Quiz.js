import React from "react";
import PropTypes from "prop-types";
import QuestionList from "./QuestionList";
import { SocialIcon } from "react-social-icons";

const Quiz = ({
  step,
  questions,
  totalQuestions,
  score,
  handleAnswerClick,
  handleEnterPress
}) => {
  return (
    <div className="wrapper">
      <header>
        <div className="question-count">
          <h2>Pergunta</h2>
          <div className="question-number">{step}</div>
          <div className="description">
            of <span>{totalQuestions}</span>
          </div>
        </div>
        <img
          src="https://media.eadbox.com/system/uploads/course/logo/5ed7ba39b0529d002577d8a5/unnamed.png"
          style={{ width: 120 }}
        />

        <div className="score-container">
          <h2>Pontuação</h2>
          <div className="score">{score}</div>
          <div className="description">points</div>
        </div>
      </header>

      <div className="questions">
        <QuestionList
          questions={questions}
          handleAnswerClick={handleAnswerClick}
          handleEnterPress={handleEnterPress}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <SocialIcon
          network="whatsapp"
          url="whatsapp://send?text=https://cht.migueldias.net"
          target="_blank"
          label="Questionario CHT"
          style={{ height: 50, width: 50, marginBottom: 10 }}
        />
        <SocialIcon
          network="facebook"
          url="https://www.facebook.com/sharer.php?u=https://cht.migueldias.net"
          target="_blank"
          label="Questionario CHT"
          style={{ height: 50, width: 50, marginBottom: 10, marginLeft: 15 }}
        />
        <SocialIcon
          network="email"
          url="mailto:%7Bemail_address%7D?subject=&body=https://cht.migueldias.net%20"
          target="_blank"
          label="Questionario CHT"
          style={{ height: 50, width: 50, marginBottom: 10, marginLeft: 15 }}
        />
      </div>
    </div>
  );
};

Quiz.propTypes = {
  step: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Quiz;
