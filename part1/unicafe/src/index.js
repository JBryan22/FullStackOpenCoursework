import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleClick = (setFn, stateVar) => {
    return () => {
      setFn(stateVar + 1);
      setAll(all + 1);
    };
  };

  return (
    <div>
      <Header text="give feedback"></Header>
      <Button handleClick={handleClick(setGood, good)} text="good"></Button>
      <Button
        handleClick={handleClick(setNeutral, neutral)}
        text="neutral"
      ></Button>
      <Button handleClick={handleClick(setBad, bad)} text="bad"></Button>
      <Header text="statistics"></Header>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
      ></Statistics>
    </div>
  );
};

const Statistics = ({ good, bad, neutral, all }) => {
  if (all > 0) {
    return (
      <table>
        <tbody>
          <Results text="good" count={good}></Results>
          <Results text="neutral" count={neutral}></Results>
          <Results text="bad" count={bad}></Results>
          <Results text="all" count={all}></Results>
          <Results text="average" count={(good - bad) / all}></Results>
          <Results text="average" count={(good / all) * 100 + " %"}></Results>
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <p>No feedback given</p>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Results = ({ text, count }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{count}</td>
    </tr>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
