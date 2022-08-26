import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Question from "./Question";
import Answer from "./Answer";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [quizzIsActive, setQuizzIsActive] = useState(false);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [randomCountries, setRandomCountries] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalTry, setTotalTry] = useState(0);
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setData(res.data);
      // console.log(res.data);
    });
    ;
  }, []);

  const generateRandomNumbers = () => {
    const nbRandomNumber = 4;
    const randomNumbers = [];
    while (randomNumbers.length < nbRandomNumber) {
      const randomNumber = Math.floor(Math.random() * data.length);
      if (!randomNumbers.includes(randomNumber))
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
  };

  const getFilteredCountries = () => {
    return data.filter((country) =>
      country.continents[0].includes(selectedRadio)
    );
  };

  const generateRandomCountries = async () => {
    const randomNumbers = generateRandomNumbers();
    const countriesAnswer = [];
    // const filteredData = await getFilteredCountries().then(
    //   console.log("aa", filteredData)
    // );

    for (const number of randomNumbers) {
      // countriesAnswer.push(data[number]);
      // console.log("ici", filteredData[number]); // ici bug
      countriesAnswer.push(data[number]);
    }
    setCorrectAnswerIndex(Math.floor(Math.random() * randomNumbers.length));
    setRandomCountries(countriesAnswer);
  };

  const handleGivingUp = () => {
    if (!displayAnswer) {
      setDisplayAnswer(true);
      setTotalTry(totalTry + 1);
    }
  };

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="4"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent) => (
          <li key={continent}>
            <input
              type="radio"
              id={continent}
              name="continentRadio"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      <ul style={{ display: quizzIsActive ? "none" : "" }}>
        {data
          .filter((country) => country.continents[0].includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} />
          ))}
      </ul>
      <br />
      <button
        className="quizzButton"
        onClick={() => {
          setQuizzIsActive(!quizzIsActive), generateRandomCountries();
        }}
      >
        QUIZZ!
      </button>

      {quizzIsActive && (
        <>
          <Question countries={randomCountries[correctAnswerIndex]} />
          <div className="answersDiv">
            {randomCountries.map((country, index) => (
              <Answer
                country={country}
                answerIndex={index}
                correctAnswerIndex={correctAnswerIndex}
                score={score}
                setScore={setScore}
                totalTry={totalTry}
                setTotalTry={setTotalTry}
                displayAnswer={displayAnswer}
                setDisplayAnswer={setDisplayAnswer}
                generateRandomCountries={generateRandomCountries}
              />
            ))}
          </div>
          <button
            onClick={() => {
              generateRandomCountries(), setDisplayAnswer(false);
            }}
          >
            Question suivante
          </button>
          <button onClick={() => handleGivingUp()}>
            Je donne ma langue au chat
          </button>
          <br />
          <button
            onClick={() => {
              setDisplayAnswer(false),
                setScore(0),
                setTotalTry(0),
                generateRandomCountries();
            }}
          >
            Réinitialiser le score
          </button>
          <p className="score">
            Votre score : {score} / {totalTry}
          </p>
          <p style={{ display: displayAnswer ? "" : "none" }}>
            Réponse : {randomCountries[correctAnswerIndex].capital}
          </p>
        </>
      )}
    </div>
  );
};

export default Countries;
