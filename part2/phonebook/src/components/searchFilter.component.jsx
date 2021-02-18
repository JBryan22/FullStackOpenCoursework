import React from "react";

const SearchFilter = (props) => {
  return (
    <div>
      <label>Search contacts: </label>
      <input
        type="text"
        value={props.filterBy}
        onChange={props.handleFilterChange}
      ></input>
    </div>
  );
};

export default SearchFilter;
