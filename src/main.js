import React from "react";
import axios from "axios";
import { render } from "react-dom";
import QuizApp from "./components/QuizApp";
import "./style.css";

axios.get("https://api.migueldias.net/cns014/perguntas").then(resp => {
  render(
    <QuizApp totalQuestions={10} perguntas={resp.data} />,
    document.getElementById("app")
  );
});
