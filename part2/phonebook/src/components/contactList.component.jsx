import React from "react";

const ContactList = (props) => {
  return (
    <ul>
      {props.personsToShow.map((person) => {
        return (
          <li key={person.name}>
            {person.name} - {person.number || "No number saved"}
            <button onClick={() => props.handleDelete(person)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
