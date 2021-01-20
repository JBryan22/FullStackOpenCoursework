import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total
        total={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      ></Total>
    </div>
  );
};

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <div>
    <Part
      part={props.parts[0].name}
      exercises={props.parts[0].exercises}
    ></Part>
    <Part
      part={props.parts[1].name}
      exercises={props.parts[1].exercises}
    ></Part>
    <Part
      part={props.parts[2].name}
      exercises={props.parts[2].exercises}
    ></Part>
  </div>
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

ReactDOM.render(<App></App>, document.getElementById("root"));
