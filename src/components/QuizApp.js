import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Quiz from "./Quiz";
import Modal from "./Modal";
import Results from "./Results";
import shuffleQuestions from "../helpers/shuffleQuestions";
// import QUESTION_DATA from "../data/quiz-data";

class QuizApp extends Component {
  state = {
    ...this.getInitialState(this.props.totalQuestions, this.props.perguntas)
  };

  static propTypes = {
    totalQuestions: PropTypes.number.isRequired,
    perguntas: PropTypes.any.isRequired
  };

  getInitialState(totalQuestions, perguntas) {
    const resp = perguntas.map(i => ({
      question: <span>{i.pergunta}</span>,
      answers: [
        <span>{i.resp1}</span>,
        <span>{i.resp2}</span>,
        <span>{i.resp3}</span>,
        <span>{i.resp4}</span>
      ],
      correct: i.certa
    }));

    totalQuestions = Math.min(totalQuestions, resp.length);
    const QUESTIONS = shuffleQuestions(resp).slice(0, totalQuestions);

    console.log(QUESTIONS);
    return {
      questions: QUESTIONS,
      totalQuestions: totalQuestions,
      userAnswers: QUESTIONS.map(() => {
        return {
          tries: 0
        };
      }),
      step: 1,
      score: 0,
      modal: {
        state: "hide",
        praise: "",
        points: ""
      }
    };
  }

  handleAnswerClick = index => e => {
    const { questions, step, userAnswers } = this.state;
    const isCorrect = questions[0].correct === index;
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;

    if (isCorrect && e.target.nodeName === "LI") {
      // Prevent other answers from being clicked after correct answer is clicked
      e.target.parentNode.style.pointerEvents = "none";

      e.target.classList.add("right");

      userAnswers[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: userAnswers
      });

      setTimeout(() => this.showModal(tries), 750);

      setTimeout(this.nextStep, 2750);
    } else if (e.target.nodeName === "LI") {
      e.target.style.pointerEvents = "none";
      e.target.classList.add("wrong");

      userAnswers[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: userAnswers
      });
    }
  };

  handleEnterPress = index => e => {
    if (e.keyCode === 13) {
      this.handleAnswerClick(index)(e);
    }
  };

  showModal = tries => {
    let praise;
    let points;

    switch (tries) {
      case 0: {
        praise = "Primeira Tentativa!";
        points = "+10";
        break;
      }
      case 1: {
        praise = "Segunda Tentativa";
        points = "+5";
        break;
      }
      case 2: {
        praise = "Certo!";
        points = "+2";
        break;
      }
      default: {
        praise = "Certo!";
        points = "+1";
      }
    }

    this.setState({
      modal: {
        state: "show",
        praise,
        points
      }
    });
  };

  nextStep = () => {
    const { questions, userAnswers, step, score } = this.state;
    const restOfQuestions = questions.slice(1);
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;

    this.setState({
      step: step + 1,
      score: this.updateScore(tries, score),
      questions: restOfQuestions,
      modal: {
        state: "hide"
      }
    });
  };

  updateScore(tries, score) {
    switch (tries) {
      case 1:
        return score + 10;
      case 2:
        return score + 5;
      case 3:
        return score + 2;
      default:
        return score + 1;
    }
  }

  restartQuiz = () => {
    this.setState({
      ...this.getInitialState(this.props.totalQuestions, this.props.perguntas)
    });
  };

  render() {
    const {
      step,
      questions,
      userAnswers,
      totalQuestions,
      score,
      modal
    } = this.state;

    if (step >= totalQuestions + 1) {
      return (
        <Results
          score={score}
          restartQuiz={this.restartQuiz}
          userAnswers={userAnswers}
        />
      );
    } else
      return (
        <Fragment>
          <Quiz
            step={step}
            questions={questions}
            totalQuestions={totalQuestions}
            score={score}
            handleAnswerClick={this.handleAnswerClick}
            handleEnterPress={this.handleEnterPress}
          />
          {modal.state === "show" && <Modal modal={modal} />}
        </Fragment>
      );
  }
}

export default QuizApp;
