import React from "react";

const Answer = ({
  country,
  correctAnswerIndex,
  answerIndex,
  score,
  setScore,
  totalTry,
  setTotalTry,
  displayAnswer,
  setDisplayAnswer,
  generateRandomCountries,
}) => {
  const checkAnswer = () => {
    
    if (answerIndex === correctAnswerIndex && displayAnswer === false) {
      setScore(score + 1);
    }
    generateRandomCountries();

    if(displayAnswer){
        setDisplayAnswer(false);
    } else {
        setTotalTry(totalTry + 1);
    }
  };
  return (
    <button className="answer" onClick={checkAnswer}>
      {country.capital}
    </button>
  );
};

export default Answer;
