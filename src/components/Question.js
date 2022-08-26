import React from "react";

// const Question = ({countries}) => {
const Question = ({countries}) => {
  
  return (
    <div className="question">
      <p>Quelle est la capitale du pays suivant : {countries.translations.fra.common} ?</p>
    </div>
  );
};

export default Question;
