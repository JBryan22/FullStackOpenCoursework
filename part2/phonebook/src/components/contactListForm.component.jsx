import React from "react";

const ContactListForm = (props) => {
  return (
    <form onSubmit={props.addNewPerson}>
      <div>
        <h2>add new contact</h2>
        name:
        <input
          type="text"
          value={props.newName}
          onChange={props.handleInputChange}
        />
        <br />
        number:
        <input
          type="text"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default ContactListForm;
