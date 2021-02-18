import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ContactList from "./components/contactList.component";
import ContactListForm from "./components/contactListForm.component";
import SearchFilter from "./components/searchFilter.component";
import contactService from "./services/contacts";
import Notification from "./components/notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    success: null,
  });

  useEffect(() => {
    contactService.getAll().then((contacts) => {
      setPersons(contacts);
    });
  }, []);

  const personsToShow = filterBy
    ? persons.filter(
        (person) => person.name.toLowerCase().indexOf(filterBy) > -1
      )
    : persons;

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const existingContact = persons.find((person) => person.name === newName);
    if (
      existingContact &&
      window.confirm(
        `${newName} is already in your contact book. Would you like to replace the old number with a new one?`
      )
    ) {
      contactService
        .update(existingContact.id, {
          ...existingContact,
          number: newNumber,
        })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== updatedPerson.id
                ? person
                : { ...updatedPerson, number: newNumber }
            )
          );
          setErrorMessage({
            message: `${updatedPerson.name}'s number successfully updated.`,
            success: true,
          });
          setTimeout(() => {
            setErrorMessage({ message: null, success: null });
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    contactService.create(personObject).then((person) => {
      setPersons(persons.concat(person));
      setErrorMessage({
        message: `${person.name}'s number successfully added.`,
        success: true,
      });
      setTimeout(() => {
        setErrorMessage({ message: null, success: null });
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (contact) => {
    if (window.confirm(`Are you sure you want to remove ${contact.name}?`)) {
      contactService
        .deletePerson(contact.id)
        .then((deletedContact) => {
          setErrorMessage({
            message: `${contact.name}'s number successfully added.`,
            success: true,
          });
          setTimeout(() => {
            setErrorMessage({ message: null, success: null });
          }, 5000);
          setPersons(persons.filter((person) => person.id !== contact.id));
        })
        .catch(() => {
          setErrorMessage({
            message: `${contact.name}'s may have already been deleted from the system. Try refreshing.`,
            success: false,
          });
          setTimeout(() => {
            setErrorMessage({ message: null, success: null });
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        addedClass={errorMessage.success}
        message={errorMessage.message}
      ></Notification>
      <SearchFilter
        filterBy={filterBy}
        handleFilterChange={handleFilterChange}
      ></SearchFilter>
      <ContactListForm
        newName={newName}
        newNumber={newNumber}
        addNewPerson={addNewPerson}
        handleInputChange={handleInputChange}
        handleNumberChange={handleNumberChange}
      ></ContactListForm>
      <h2>Numbers</h2>
      <ContactList
        personsToShow={personsToShow}
        handleDelete={deletePerson}
      ></ContactList>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
