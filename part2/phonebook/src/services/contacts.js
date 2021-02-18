import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const base = axios.get(baseUrl);
  return base.then((response) => response.data);
};

const create = (person) => {
  const base = axios.post(baseUrl, person);
  return base.then((response) => response.data);
};

const update = (id, updatedPerson) => {
  const base = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return base.then((response) => response.data);
};

const deletePerson = (id) => {
  const base = axios.delete(`${baseUrl}/${id}`);
  return base.then((response) => response.data);
};

export default { getAll, create, update, deletePerson };
