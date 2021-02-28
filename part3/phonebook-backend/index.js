const express = require("express");
const app = express();
const morgan = require("morgan");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

let contacts = [
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "jesse",
    number: "123",
    id: 5,
    newNumber: "239043209",
  },
  {
    name: "jessesdfasd",
    number: "999",
    id: 6,
  },
];

app.use(express.json());
app.use(requestLogger);
app.use(morgan("tiny"));

app.get("/api/persons", (request, response) => {
  response.json(contacts);
});

app.get("/api/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      contacts.length
    } people</p><p>${Date.now()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = contacts.find((c) => c.id === id);
  if (!person) {
    return response.status(404).end();
  }
  return response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  contacts = contacts.map((c) => c.id !== id);
  return response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Missing content",
    });
  }
  if (contacts.find((c) => c.name === body.name)) {
    return response.status(409).json({
      error: "Contact name already exists",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000),
  };
  contacts = contacts.concat(person);
  return response.json(person);
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
