import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <div>
    {props.parts.map((part) => {
      return <Part key={part.id} part={part}></Part>;
    })}
  </div>
);

const Total = ({ parts }) => {
  let total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );

  return (
    <p>
      <strong>total of {total} exercises </strong>
    </p>
  );
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

export default Course;
